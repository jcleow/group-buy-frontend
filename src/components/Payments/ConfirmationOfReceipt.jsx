import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import { deleteFromStorage } from '@rehooks/local-storage';
import { Link } from 'react-router-dom';
import { GroupBuyContext, resetSelectedItemNQty } from '../../store.jsx';
import PAGE_NAMES from '../utility/paymentPageNames.js';

export default function ConfirmationOfReceipt({ setMode }) {
  const { store, dispatch } = useContext(GroupBuyContext);

  const handleBtnClick = () => {
    // clear the local storage
    // deleteFromStorage('mode');
  };

  console.log('store.totalQuantityOrdered before reset');
  console.log(store.totalQuantityOrdered);
  // clear the selected item and quantity in the store
  useEffect(() => {
    dispatch(resetSelectedItemNQty());
    console.log('store.totalQuantityOrdered after reset');
    console.log(store.totalQuantityOrdered);
  }, []);

  return (
    <div className="container m-4 ml-auto mr-auto">
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
    </div>
  );
}

// ConfirmationOfReceipt.propTypes = {
//   setMode: PropTypes.func.isRequired,
//   PAGE_NAMES: PropTypes.objectOf.isRequired,
// };
