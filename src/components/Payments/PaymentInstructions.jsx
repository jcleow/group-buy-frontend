import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import { writeStorage } from '@rehooks/local-storage';
import PAGE_NAMES from '../utility/paymentPageNames.js';

const SAMPLE_PHONE_NUM = '93342121';
export default function PaymentInstructions({ setMode }) {
  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAGE_NAMES.UPLOAD_RECEIPT);
    // writeStorage('mode', PAGE_NAMES.UPLOAD_RECEIPT);
  };
  const handleBackNavBtn = () => {
    setMode(PAGE_NAMES.PURCHASE_SUMMARY);
  };
  return (
    <div className="container m-4 ml-auto mr-auto">
      <div className="row">
        <div className="col payment-form-progress-bar">
          <button type="button" onClick={handleBackNavBtn}>⬅️ Purchase Summary</button>
        </div>
      </div>
      <div className="row">
        <div className="col ">
          Instructions:
          <ol>
            <li>
              Currently, the only accepted payment mode is PayNow, and all
              payments should be made to
              {' '}
              {SAMPLE_PHONE_NUM}
            </li>
            <li>
              Please make payment according to the amountindicated in your order
              summary.
            </li>
            <li>
              Thereafter, take a screenshot as evidence of payment; you will be
              prompted to upload this screenshot in the next page
            </li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button className="btn btn-primary" onClick={handleBtnClick}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// PaymentInstructions.propTypes = {
//   setMode: PropTypes.func.isRequired,
//   PAGE_NAMES: PropTypes.objectOf.isRequired,
// };
