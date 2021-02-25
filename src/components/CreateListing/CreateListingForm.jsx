import React, { useState, useEffect } from 'react';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import AboutItem from './AboutItem.jsx';
import CampaignDates from './CampaignDates.jsx';
import QtyAndPrice from './QtyAndPrice.jsx';
import TnC from './TnC.jsx';
import SubmittedListing from './SubmittedListing.jsx';
import { CreateListingProvider } from '../../createListingStore.jsx';

export default function CreateListingForm() {
  const ABOUT_ITEM = 'ABOUT_ITEM';
  const CAMPAIGN_DATES = 'CAMPAIGN_DATES';
  const QTY_AND_PRICE = 'QTY_AND_PRICE';
  const TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS';
  const SUBMITTED = 'SUBMITTED';

  const [mode, setMode] = useState(ABOUT_ITEM);
  const [existingMode] = useLocalStorage('formstep');
  console.log(existingMode, 'existingMode-1');

  useEffect(() => {
    if (existingMode !== ABOUT_ITEM && existingMode) {
      setMode(existingMode);
      console.log('setting to next page');
    }
  }, []);

  const manageListingCreationForm = () => {
    switch (mode) {
      case ABOUT_ITEM:
        return <AboutItem setMode={setMode} />;
      case CAMPAIGN_DATES:
        return <CampaignDates setMode={setMode} />;
      case QTY_AND_PRICE:
        return <QtyAndPrice setMode={setMode} />;
      case TERMS_AND_CONDITIONS:
        return <TnC setMode={setMode} />;
      case SUBMITTED:
        return <SubmittedListing />;
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
