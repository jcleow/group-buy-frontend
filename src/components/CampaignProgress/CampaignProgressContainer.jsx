import React from 'react';
import './CampaignProgress.css';
import { CampaignProgressProvider } from '../../campaignProgressStore.jsx';
import ActivityChart from './ActivityChart.jsx';
import CampaignPurchasersTable from './CampaignPurchasersTable.jsx';
import CampaignProgressBreadCrumb from '../Breadcrumb/CampaignProgressBreadCrumb.jsx';

export default function CampaignProgress() {
  return (
    <CampaignProgressProvider>
      <div>
        <CampaignProgressBreadCrumb />
        <ActivityChart />
        <CampaignPurchasersTable />
      </div>
    </CampaignProgressProvider>
  );
}
