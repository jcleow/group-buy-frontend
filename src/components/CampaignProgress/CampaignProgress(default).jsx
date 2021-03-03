import React, { useState, useEffect, useContext } from 'react';
import 'react-vis/dist/style.css';
import './CampaignProgress.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
  FlexibleXYPlot,
  XAxis,
  Hint,
  LineMarkSeries,
  GradientDefs,
  AreaSeries,
  LineSeries,

} from 'react-vis';

import { loadCurrlistingPurchases as loadCurrListingPurchases, CampaignProgressProvider, CampaignProgressContext } from '../../campaignProgressStore.jsx';

// Helper that generates and pushes the past 7 days
const generatePastSevenDays = () => {
  const pastSevenDaysArray = [];
  for (let i = 7; i >= 0; i -= 1) {
    // Start from today's date then progressive go backwards
    const singleDate = new Date();
    singleDate.setDate(singleDate.getDate() - i);

    // Format into DD/MM
    const options = { day: '2-digit', month: '2-digit' };
    const formattedDate = singleDate.toLocaleDateString('en-GB', options);

    // Append into an accumulative array
    pastSevenDaysArray.push(formattedDate);
  }
  return pastSevenDaysArray;
};

// Helper that gets the lowest y-value
const getLowestYVal = (purchaseRange) => {
  let yLow = null;
  purchaseRange.forEach((day) => {
    if (day.y < yLow || yLow === null) {
      yLow = day.y;
    }
  });

  if (yLow !== null) {
    return yLow;
  }
  return 0;
};

function ActivityChart() {
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

  // Y axis to be filled up with Count of purchases
  const dailyPurchasesCount = campaignStore.pastSevenDaysCount;
  const YLOW = getLowestYVal(dailyPurchasesCount);

  return (
    <div>
      <h4 className="mt-2 ml-5">Daily Purchase Count (7 Days)</h4>
      <div className="d-flex justify-content-center activity-graph">
        <FlexibleXYPlot onMouseLeave={() => { setValue(null); }} xType="ordinal">
          <XAxis tickValues={xAxisTickValues} />
          <LineMarkSeries
            onNearestX={rememberValue}
            onValueMouseOut={forgetValue}
            color="#F37B36"
            data={dailyPurchasesCount}
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
            data={dailyPurchasesCount}
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

function CampaignPurchasersTable() {
  const { campaignStore, dispatchCampaign } = useContext(CampaignProgressContext);

  useEffect(() => {
    // pass in dispatch fn and currListingId
    loadCurrListingPurchases(dispatchCampaign, 3);
  }, []);

  const rowsOfPurchases = campaignStore.allPurchases.map((purchase, i) => {
    const {
      username, paymentStatus, createdAt, reputation, dateDelivered,
    } = purchase;

    // format the dates
    const formattedDateDelivered = new Date(dateDelivered).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: '2-digit' });
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: '2-digit' });

    return (
      <tr>
        <td className="sticky-col first-col">{i + 1}</td>
        <td className="second-col">{username}</td>
        <td className="normal-col">{paymentStatus}</td>
        <td className="normal-col">1</td>
        <td className="normal-col">{formattedCreatedAt}</td>
        <td className="normal-col">{reputation}</td>
        <td className="normal-col">{formattedDateDelivered}</td>
      </tr>
    );
  });

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
        {rowsOfPurchases}
      </table>
    </div>
  );
}

export default function CampaignProgress() {
  return (
    <CampaignProgressProvider>
      <div>
        <ActivityChart />
        <CampaignPurchasersTable />
      </div>
    </CampaignProgressProvider>
  );
}
