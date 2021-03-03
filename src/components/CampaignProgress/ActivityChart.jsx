import React, { useState, useEffect, useContext } from 'react';
import {
  FlexibleXYPlot,
  YAxis,
  XAxis,
  Hint,
  LineMarkSeries,
  GradientDefs,
  AreaSeries,
  LineSeries,

} from 'react-vis';
import 'react-vis/dist/style.css';
import { generatePastSevenDays, getLowestYVal, generateYAxisTickValues } from '../utility/campaignProgressHelper.jsx';
import {
  loadCurrListingPurchases, CampaignProgressContext,
} from '../../campaignProgressStore.jsx';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default function ActivityChart() {
  const [value, setValue] = useState(null);
  const { campaignStore, dispatchCampaign } = useContext(CampaignProgressContext);
  useEffect(() => {
    // pass in dispatch fn and currListingId
    loadCurrListingPurchases(dispatchCampaign, 3);
  }, []);

  // Handler for hovering away from curr data point
  const forgetValue = () => {
    setValue(null);
  };

  // Handler for hovering into another data point
  const rememberValue = (val) => {
    setValue(val);
  };

  const xAxisTickValues = generatePastSevenDays();
  const yAxisTickValues = generateYAxisTickValues(campaignStore);
  const datesAndPurchasesCount = campaignStore.pastSevenDaysCount;
  const YLOW = getLowestYVal(datesAndPurchasesCount);

  // Calc total purchases
  const calcTotalPurchases = () => {
    const totalPurchases = campaignStore.allPurchases.reduce((acc, curr) => acc + curr.quantity, 0);
    return totalPurchases;
  };
  return (
    <div>
      <h4 className="mt-2 ml-5">
        Total Purchases:
        {calcTotalPurchases()}
      </h4>
      <h6 className="mt-2 ml-5">Daily Purchase Count (7 Days)</h6>
      <div className="d-flex justify-content-center activity-graph">
        <FlexibleXYPlot onMouseLeave={() => { setValue(null); }} xType="ordinal">
          <YAxis tickValues={yAxisTickValues} />
          <XAxis tickValues={xAxisTickValues} />
          <LineMarkSeries
            onNearestX={rememberValue}
            onValueMouseOut={forgetValue}
            color="#F37B36"
            data={datesAndPurchasesCount}
            size={0}
          />
          <GradientDefs>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F37B36" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FAF9FF" stopOpacity={0.1} />
            </linearGradient>
          </GradientDefs>
          <AreaSeries
            color="url(#CoolGradient)"
            data={datesAndPurchasesCount}
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
                Total Purchases:
                {' '}
                <b>{value.y}</b>
              </p>
            </div>
          </Hint>
          )}
        </FlexibleXYPlot>
      </div>
    </div>
  );
}
