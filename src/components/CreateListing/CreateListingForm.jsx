import React, { useState } from 'react';
import AboutItem from './AboutItem.jsx';
import CampaignDates from './CampaignDates.jsx';
import QtyAndPrice from './QtyAndPrice.jsx';
import TnCs from './TnCs.jsx';
import { CreateListingProvider } from '../../createListingStore.jsx';

export default function CreateListingForm() {
  const ABOUT_ITEM = 'ABOUT_ITEM';
  const CAMPAIGN_DATES = 'CAMPAIGN_DATES';
  const QTY_AND_PRICE = 'QTY_AND_PRICE';
  const TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS';

  const [mode, setMode] = useState(ABOUT_ITEM);

  const manageListingCreationForm = () => {
    switch (mode) {
      case ABOUT_ITEM:
        return <AboutItem setMode={setMode} />;
      case CAMPAIGN_DATES:
        return <CampaignDates setMode={setMode} />;
      case QTY_AND_PRICE:
        return <QtyAndPrice setMode={setMode} />;
      case TERMS_AND_CONDITIONS:
        return <TnCs setMode={setMode} />;
      default:
        return null;
    }
  };
  return (
    <div className="container">
      <CreateListingProvider>
        {manageListingCreationForm()}
      </CreateListingProvider>
    </div>
  );
}
