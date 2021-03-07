import React, { useState, useEffect, useContext } from 'react';
// import { useLocalStorage } from '@rehooks/local-storage';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import PurchaseSummary from './PurchaseSummary.jsx';
import ConfirmationOfReceipt from './ConfirmationOfReceipt.jsx';
import UploadReceipt from './UploadReceipt.jsx';
import PaymentInstructions from './PaymentInstructions.jsx';
import PAGE_NAMES from '../utility/paymentPageNames.js';
import { GroupBuyContext, selectListingAction, setTotalQuantityOrdered } from '../../store.jsx';

const {
  PURCHASE_SUMMARY,
  PAYMENT_INSTRUCTIONS,
  UPLOAD_RECEIPT,
  CONFIRMATION_OF_RECEIPT,
} = PAGE_NAMES;

export default function MainPaymentPage() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { selectedListingData, totalQuantityOrdered } = store;
  const [mode, setMode] = useState(PURCHASE_SUMMARY);
  // if selectedListingData is empty or undefined, get the info from the user's local storage

  const [tempSelectedData] = useLocalStorage('selectedListingData');
  const [tempTotalQuantityOrdered] = useLocalStorage('totalQuantityOrdered');

  console.log('selectedListingData at start of code is:');
  console.log(selectedListingData);

  useEffect(() => {
    if (Object.keys(selectedListingData).length < 1) {
      dispatch(selectListingAction(tempSelectedData));
      dispatch(setTotalQuantityOrdered(tempTotalQuantityOrdered));
    }

    // write the listing data to the store
    writeStorage('selectedListingData', selectedListingData);
    writeStorage('totalQuantityOrdered', totalQuantityOrdered);
  }, []);

  // use 'mode' to control when each page should display
  const managePageDisplay = () => {
    switch (mode) {
      case PURCHASE_SUMMARY:
        return <PurchaseSummary setMode={setMode} selectedListingData={selectedListingData} totalQuantityOrdered={totalQuantityOrdered} />;

      case PAYMENT_INSTRUCTIONS:
        return <PaymentInstructions setMode={setMode} />;

      case UPLOAD_RECEIPT:
        return <UploadReceipt setMode={setMode} selectedListingData={selectedListingData} totalQuantityOrdered={totalQuantityOrdered} />;

      case CONFIRMATION_OF_RECEIPT:
        return <ConfirmationOfReceipt setMode={setMode} />;

      default:
        return <PurchaseSummary />;
    }
  };

  return (
    <div>

      <div className=" page-container" />
      {managePageDisplay()}

    </div>
  );
}
