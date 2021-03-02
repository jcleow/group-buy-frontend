import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import './CampaignProgress.css';
import {
  FlexibleXYPlot,
  XAxis,
  Hint,
  LineMarkSeries,
  GradientDefs,
  AreaSeries,
  LineSeries,

} from 'react-vis';

function ActivityChart() {
  const [value, setValue] = useState(null);

  // Handler for hovering away from curr data point
  const forgetValue = () => {
    setValue(null);
  };

  // Handler for hovering into another data point
  const rememberValue = (val) => {
    setValue(val);
  };

  const xAxisTickValues = [];
  const dataPoints = [{ x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }];
  const YLOW = 0;

  return (
    <div>
      <h4 className="mt-2 ml-5">Past 7 Day Activity</h4>
      <div className="d-flex justify-content-center activity-graph">
        <FlexibleXYPlot onMouseLeave={() => { setValue(null); }} xType="ordinal">
          <XAxis tickValues={xAxisTickValues} />
          <LineMarkSeries
            onNearestX={rememberValue}
            onValueMouseOut={forgetValue}
            color="#846AFD"
            data={dataPoints}
            size={0}
          />
          <GradientDefs>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#846AFD" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FAF9FF" stopOpacity={0.1} />
            </linearGradient>
          </GradientDefs>
          <AreaSeries
            color="url(#CoolGradient)"
            data={dataPoints}
          />
          {value ? (
            <LineSeries
              data={[{ x: value.x, y: value.y }, { x: value.x, y: YLOW }]}
              stroke="#f5f6fa"
              size={1}
            />
          ) : null}
          {value
          && (
          <Hint value={value}>
            <div className="rv-hint_content" style={{ background: 'rgba(255, 255, 255, 0.5)', color: 'rgba(0,0,0, 0.6)' }}>
              <p>
                Date:
                {' '}
                <b>{value.x}</b>
              </p>
              <p>
                Total Value:
                {' '}
              </p>
            </div>
          </Hint>
          )}
        </FlexibleXYPlot>
      </div>
    </div>
  );
}

function CampaignPurchasersTable() {
  return (
    <div className="d-flex flex-row justify-content-center purchaser-table">
      <table className="text-center">
        <tr>
          <th className="sticky-col first-col">S/N</th>
          <th className="second-col">Username</th>
          <th className="normal-col">Payment Status</th>
          <th className="normal-col">Quantity</th>
          <th className="normal-col">Date Participated</th>
          <th className="normal-col">Reputation</th>
          <th className="normal-col">Date Delivered</th>
        </tr>
        <tr>
          <td className="sticky-col first-col">1</td>
          <td className="second-col">Jit Corn</td>
          <td className="normal-col">Paid</td>
          <td className="normal-col">30</td>
          <td className="normal-col">3/12/2020</td>
          <td className="normal-col">48/50</td>
          <td className="normal-col">1/3/2021</td>
        </tr>
      </table>
    </div>
  );
}

export default function CampaignProgress() {
  return (
    <div>
      <ActivityChart />
      <CampaignPurchasersTable />
    </div>
  );
}
