import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const SAMPLE_PHONE_NUM = '93342121';
export default function PaymentInstructions({ setMode, PAGE_NAMES }) {
  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAGE_NAMES.UPLOAD_RECEIPT);
  };

  return (
    <>
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
              Please make payment based on the bill indicated in your order
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
    </>
  );
}

// PaymentInstructions.propTypes = {
//   setMode: PropTypes.func.isRequired,
//   PAGE_NAMES: PropTypes.objectOf.isRequired,
// };
