import React, { useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types';
import { writeStorage } from '@rehooks/local-storage';
import PAGE_NAMES from '../utility/paymentPageNames.js';
import { GroupBuyContext } from '../../store.jsx';

export default function PurchaseSummary({ setMode }) {
  const { store } = useContext(GroupBuyContext);
  const { selectedListingData, totalQuantityOrdered } = store;

  const { PAYMENT_INSTRUCTIONS } = PAGE_NAMES;

  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAYMENT_INSTRUCTIONS);
    writeStorage('mode', PAYMENT_INSTRUCTIONS);
  };
  console.log(selectedListingData);

  const totalPrice = selectedListingData.discountedPrice * totalQuantityOrdered;

  return (
    <div className="container">
      <div className="row">
        <div className="col header">
          <h5>Purchase Summary</h5>
        </div>
      </div>
      <div className="row summary-table-header">
        <div className="col col-12 col-md-4">
          <img src={selectedListingData.images.img1} alt="itemImage" className="img-responsive" width="100%" />
        </div>
        <div className="col col-12 col-md-8">
          <div className="row">
            <div className="col-4">
              Item
            </div>
            <div className="col-8">
              {selectedListingData.title}
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              Price breakdown
            </div>
            <div className="col-8 price-breakdown-container">
              <div className="price-breakdown">
                $
                {selectedListingData.discountedPrice}

                <div className="faded-description"> (Unit price) </div>
              </div>
              <div className="price-breakdown">

                <span>x</span>

              </div>
              <div className="price-breakdown">
                <div>{totalQuantityOrdered}</div>
                <div className="faded-description">(Qty)</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              Total
            </div>
            <div className="col-8">
              $
              {totalPrice}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col terms-n-conditions">
          <div>
            By proceeding, you agree that you have read, and abide by
            Group-Buy&apos;s terms and conditions.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button className="btn btn-primary" onClick={handleBtnClick}>
            Pay $
            {totalPrice}
          </Button>
        </div>
      </div>
    </div>
  );
}

// PurchaseSummary.propTypes = {
//   setMode: PropTypes.func.isRequired,
// };
