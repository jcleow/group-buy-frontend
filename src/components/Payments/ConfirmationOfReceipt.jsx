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

  // clear the selected item and quantity in the store
  useEffect(() => {
    dispatch(resetSelectedItemNQty());
  }, []);

  return (
    <div className="container-fluid ml-auto mr-auto">
      <div className="row">
        <div className="col payment-form-progress-bar backward">
          <div> Confirmation</div>
        </div>
      </div>

      <div className="row">
        <div className="col mt-2">
          <div>
            Thank you for your purchase. Please give us up to 3 working days to
            confirm your payment. If needed, our staff will get in touch via
            email.
          </div>
        </div>
      </div>
      <div className="row">
<<<<<<< HEAD
        <div className="col payment-btn-col">
          <Link to="/home">
=======
        <div className="col">
          <Link exact to="/">
>>>>>>> main
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
