import React, { useState, useEffect } from 'react';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import PurchaseSummary from './PurchaseSummary.jsx';
import ConfirmationOfReceipt from './ConfirmationOfReceipt.jsx';
import UploadReceipt from './UploadReceipt.jsx';
import PaymentInstructions from './PaymentInstructions.jsx';
import PAGE_NAMES from '../utility/paymentPageNames.js';

const {
  PURCHASE_SUMMARY,
  PAYMENT_INSTRUCTIONS,
  UPLOAD_RECEIPT,
  CONFIRMATION_OF_RECEIPT,
} = PAGE_NAMES;

// const PURCHASE_SUMMARY = 'see purchase summary';
// const PAYMENT_INSTRUCTIONS = 'see payment instructions';
// const UPLOAD_RECEIPT = 'see upload receipt';
// const CONFIRMATION_OF_RECEIPT = 'see confirmation of receipt';

export default function MainPaymentPage() {
  // when the page first loads,'mode' is undefined;
  // when mode's values  are removed (i.e. after last payment page, mode's value bcomes null)
  const currPage = useLocalStorage('mode')[0] === undefined || null ? PURCHASE_SUMMARY : useLocalStorage('mode')[0];

  const [mode, setMode] = useState(currPage);

  // when page renders, write the current mode to the local storage
  useEffect(() => {
    writeStorage('mode', mode);
  }, [mode]);

  console.log('mode state is:');
  console.log(mode);
  console.log("useLocalStorage('mode')[0]is:");
  console.log(useLocalStorage('mode')[0]);

  // use 'mode' to control when each page should display
  const managePageDisplay = () => {
    switch (mode) {
      case PURCHASE_SUMMARY:
        return <PurchaseSummary setMode={setMode} />;
      case PAYMENT_INSTRUCTIONS:
        return <PaymentInstructions setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;
      case UPLOAD_RECEIPT:
        return <UploadReceipt setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;

      case CONFIRMATION_OF_RECEIPT:
        return <ConfirmationOfReceipt setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;

      default:
        return <PurchaseSummary />;
    }
  };

  return (
    <div>

      <div className="container page-container" />
      {managePageDisplay()}
    </div>
  );
}
