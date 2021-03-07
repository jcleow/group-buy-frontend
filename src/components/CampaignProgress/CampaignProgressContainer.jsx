import React from 'react';
import './campaignProgress.css';
import { CampaignProgressProvider } from '../../campaignProgressStore.jsx';
import ActivityChart from './ActivityChart.jsx';
import CampaignPurchasersTable from './CampaignPurchasersTable.jsx';

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
