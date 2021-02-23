import React, {useState} from 'react';
import NavbarComponent from '../NavbarComponent.jsx';
import PurchaseSummary from './PurchaseSummary.jsx';
import PaymentInstructions from './PaymentInstructions.jsx';
import ConfirmationOfReceipt from './ConfirmationOfReceipt.jsx';

const PAGE_NAMES = {
  PURCHASE_SUMMARY: 'see purchase summary',
  PAYMENT_INSTRUCTIONS: 'see payment instructions',
  UPLOAD_RECEIPT: 'see upload receipt',
  CONFIRMATION_OF_RECEIPT: 'see confirmation of receipt',
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

  const managePageDisplay = () => {
    switch (mode) {
      case PURCHASE_SUMMARY:
        <PurchaseSummary setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;
        break;
      case PAYMENT_INSTRUCTIONS:
        <PaymentInstructions setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;
        break;
      case UPLOAD_RECEIPT:
        <UploadReceipt setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;
        break;
      case CONFIRMATION_OF_RECEIPT:
        <ConfirmationOfReceipt setMode={setMode} PAGE_NAMES={PAGE_NAMES} />;
        break;

      default:
        <PurchaseSummary />;
    }
  };
  return (
    <div>
      <NavbarComponent />
      <div className="container page-container" />
      {managePageDisplay}
    </div>
  );
}
