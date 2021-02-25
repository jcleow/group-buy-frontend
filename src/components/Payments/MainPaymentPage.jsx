import React, { useState } from 'react';
import { writeStorage } from '@rehooks/local-storage';
import NavbarComponent from '../NavbarComponent.jsx';
import PurchaseSummary from './PurchaseSummary.jsx';
import ConfirmationOfReceipt from './ConfirmationOfReceipt.jsx';
import UploadReceipt from './UploadReceipt.jsx';
import PaymentInstructions from './PaymentInstructions.jsx';

const PAGE_NAMES = {
  PURCHASE_SUMMARY: 'PURCHASE_SUMMARY',
  PAYMENT_INSTRUCTIONS: 'PAYMENT_INSTRUCTIONS',
  UPLOAD_RECEIPT: 'UPLOAD_RECEIPT',
  CONFIRMATION_OF_RECEIPT: 'CONFIRMATION_OF_RECEIPT',
};
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
  const [mode, setMode] = useState(PURCHASE_SUMMARY);

  React.useEffect(() => {
    writeStorage('mode', mode);
  }, [mode]);

  const managePageDisplay = () => {
    switch (mode) {
      case PURCHASE_SUMMARY:
        return <PurchaseSummary setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;
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
      <NavbarComponent />
      <div className="container page-container" />
      {managePageDisplay()}
    </div>
  );
}
