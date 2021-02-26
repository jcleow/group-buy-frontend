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

export default function MainPaymentPage() {
  const [mode, setMode] = useState(PURCHASE_SUMMARY);

  const [currPage] = useLocalStorage('mode');
  console.log('currPage is:');
  console.log(currPage);
  useEffect(() => {
    if (currPage && (currPage !== null) && (currPage !== PURCHASE_SUMMARY)) {
      setMode(currPage);
    }
  }, []);

  // use 'mode' to control when each page should display
  const managePageDisplay = () => {
    switch (mode) {
      case PURCHASE_SUMMARY:
        return <PurchaseSummary setMode={setMode} />;

      case PAYMENT_INSTRUCTIONS:
        return <PaymentInstructions setMode={setMode} />;

      case UPLOAD_RECEIPT:
        return <UploadReceipt setMode={setMode} />;

      case CONFIRMATION_OF_RECEIPT:
        return <ConfirmationOfReceipt setMode={setMode} />;

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
