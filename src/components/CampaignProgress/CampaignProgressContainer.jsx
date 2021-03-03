import React, { useState, useEffect, useContext } from 'react';
import 'react-vis/dist/style.css';
import './CampaignProgress.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {
  FlexibleXYPlot,
  XAxis,
  Hint,
  LineMarkSeries,
  GradientDefs,
  AreaSeries,
  LineSeries,

} from 'react-vis';
import { generatePaginationOptions, tableColumns } from './CampaignProgressTableHelpers.jsx';
import {
  loadCurrListingPurchases, CampaignProgressProvider, CampaignProgressContext, updatePurchaseDateDelivered,
} from '../../campaignProgressStore.jsx';
import { generatePastSevenDays, getLowestYVal } from '../utility/campaignProgressHelper.js';
import { convertToDdMm } from '../../helper.js';

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
  const [clicked, setClicked] = useState(true);

  const handleClick = () => {
    setClicked(false);
  };

  useEffect(() => {
    // pass in dispatch fn and currListingId
    loadCurrListingPurchases(dispatchCampaign, 3);
  }, []);
  // Assign an index based ID to each purchase (this ID is subject to change during filtering)
  const indexAllPurchases = campaignStore.allPurchases.map((purchase, idx) => ({
    ...purchase,
    serialNum: idx + 1,
    createdAt: convertToDdMm(new Date(purchase.createdAt)),
    dateDelivered: (
      purchase.dateDelivered !== null ? convertToDdMm(new Date(purchase.dateDelivered)) : null),
  }));

  return (
    <div className="purchaser-table">
      <BootstrapTable
        keyField="id"
        data={indexAllPurchases}
        columns={tableColumns}
        pagination={paginationFactory(generatePaginationOptions(indexAllPurchases))}
        cellEdit={cellEditFactory({
          mode: 'click',
          blurToSave: false,
          onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
          beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
          afterSaveCell: (oldDate, newDate, row, column) => { updatePurchaseDateDelivered(
            dispatchCampaign, campaignStore.currListingId, row.id, newDate,
          );
          console.log(row, 'row');
          console.log(campaignStore, 'campaignStore');
          },

        })}
        striped
        hover
        condensed
      />
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
