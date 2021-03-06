import React, { useState, useEffect, useContext } from 'react';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import AboutItem from './AboutItem.jsx';
import CampaignDates from './CampaignDates.jsx';
import QtyAndPrice from './QtyAndPrice.jsx';
import TnC from './TnC.jsx';
import LoadNewListing from './LoadNewListing.jsx';
import {
  CreateListingProvider, formModes, CREATE_LISTING_FORM, CreateListingContext,
} from '../../createListingStore.jsx';

export default function CreateListingForm() {
  // Modes of the form
  const {
    ABOUT_ITEM, CAMPAIGN_DATES, QTY_AND_PRICE, TERMS_AND_CONDITIONS, SUBMITTED,
    FORM_STEP,
  } = formModes;

  // Control the state of the multi-step form
  const [mode, setMode] = useState(ABOUT_ITEM);

  // Track which mode the form is at
  const [existingMode] = useLocalStorage(FORM_STEP);

  // If the existing mode suggets a different mode, switch to that mode
  useEffect(() => {
    if (existingMode !== ABOUT_ITEM && existingMode) {
      setMode(existingMode);
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
        return <LoadNewListing setMode={setMode} />;
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
