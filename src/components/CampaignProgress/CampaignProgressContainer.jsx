import React, { useEffect } from 'react';
import './CampaignProgress.css';
import { CampaignProgressProvider } from '../../campaignProgressStore.jsx';
import ActivityChart from './ActivityChart.jsx';
import CampaignPurchasersTable from './CampaignPurchasersTable.jsx';
import CampaignProgressBreadCrumb from '../Breadcrumb/CampaignProgressBreadCrumb.jsx';
import { getUserIdFromCookie } from '../../helper.js';

export default function CampaignProgress() {
  // Redirect user to error page if not signed in
  useEffect(() => {
    const loggedInUserId = getUserIdFromCookie();
    if (!loggedInUserId) {
      window.location = '/error';
    }
  }, []);
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
