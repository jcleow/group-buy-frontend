import React, { useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types';
import PAGE_NAMES from '../utility/paymentPageNames.js';
import { GroupBuyContext } from '../../store.jsx';
import './stylesheets/AllPaymentRelated.css';
import './stylesheets/PurchaseSummary.css';

export default function PurchaseSummary({ setMode, selectedListingData, totalQuantityOrdered }) {
  const { store } = useContext(GroupBuyContext);
  // const { selectedListingData, totalQuantityOrdered } = store;

  const { PAYMENT_INSTRUCTIONS } = PAGE_NAMES;

  // useWriteStorage to save selectedListingData to local storage;
  // on page render, if local storage not empty, take data fromt there; else, take info from store.js.
  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAYMENT_INSTRUCTIONS);
    // writeStorage('mode', PAYMENT_INSTRUCTIONS);
  };

  const totalPrice = selectedListingData.discountedPrice * totalQuantityOrdered;
  const unitPrice = Number(selectedListingData.discountedPrice);
  return (
    <div className="container-fluid ml-auto mr-auto ">
      <div className="row ">
        <div className="col  payment-form-progress-bar">
          <div className="backward">
            {' '}
          </div>
          <div className="forward">Payment instructions ➡️ </div>
        </div>
      </div>
      <div className="row">
        <div className="col header">
          <h5>Purchase Summary</h5>
        </div>
      </div>
      <div className="row summary-table-header">
        <div className="col col-12 col-md-4">
          <img src={selectedListingData.images?.img1} alt="itemImage" className="img-responsive" width="100%" />
        </div>
        <div className="col col-12 col-md-8">
          <div className="row">
            <div className="col-4 field-key">
              Item
            </div>
            <div className="col-8">
              {selectedListingData.title}
            </div>
          </div>
          <div className="row">
            <div className="col-4 field-key">
              Price breakdown
            </div>
            <div className="col-8 price-breakdown-container">
              <div className="price-breakdown">
                $
                {unitPrice.toFixed(2)}

                <div className="faded-description"> (Unit price) </div>
              </div>
              <div className="price-breakdown">

                <span>x</span>

              </div>
              <div className="price-breakdown">
                <div>{totalQuantityOrdered}</div>
                <div className="faded-description">(Qty)</div>
              </div>
              <div className="price-breakdown">
                <span>=</span>
              </div>
              <div className="price-breakdown">
                $
                {totalPrice.toFixed(2)}

                <div className="faded-description"> (Total) </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col terms-n-conditions">

          <div className="disclaimer">
            Disclaimer:
            By proceeding, you agree that you have read, and abide by
            Group-Buy&apos;s terms and conditions.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col payment-btn-col">
          <Button className="btn btn-primary" onClick={handleBtnClick}>
            Pay $
            {totalPrice.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}

// PurchaseSummary.propTypes = {
//   setMode: PropTypes.func.isRequired,
// };
