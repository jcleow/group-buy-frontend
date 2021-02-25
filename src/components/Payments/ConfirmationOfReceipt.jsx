import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { deleteFromStorage } from '@rehooks/local-storage';
import { Link } from 'react-router-dom';

export default function ConfirmationOfReceipt({ setMode, PAGE_NAMES }) {
  const handleBtnClick = () => {
    // clear the local storage
    deleteFromStorage('mode');

    // save the state to the cookie
    // updateMode to switch to next page
    // setMode(CONFIRMATION_OF_RECEIPT);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          {/* insert the summary of item purchased, qty, price per unit, and total price */}
        </div>
      </div>
      <div className="row">
        <div className="col terms-n-conditions">
          <div>
            Thank you for your purchase. Please give us up to 3 working days to
            confirm your payment. If needed, our staff will get in touch via
            email.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link to="/home">
            <Button className="btn btn-primary" onClick={handleBtnClick}>
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

// ConfirmationOfReceipt.propTypes = {
//   setMode: PropTypes.func.isRequired,
//   PAGE_NAMES: PropTypes.objectOf.isRequired,
// };
