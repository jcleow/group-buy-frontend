import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import { writeStorage } from '@rehooks/local-storage';
import { GroupBuyContext, recordPurchase } from '../../store.jsx';
import PAGE_NAMES from '../utility/paymentPageNames.js';

export default function UploadReceipt({ setMode, selectedListingData, totalQuantityOrdered }) {
// create a state that saves the img of the paynow receipt
  const [selectedFile, setSelectedFile] = useState(null);
  // destructuring to get dispatch
  const { store, dispatch } = useContext(GroupBuyContext);
  // const { selectedListingData, totalQuantityOrdered } = store;

  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAGE_NAMES.CONFIRMATION_OF_RECEIPT);
    // writeStorage('mode', PAGE_NAMES.CONFIRMATION_OF_RECEIPT);
  };

  const handleFileSelection = (e) => {
    console.log('uploading file');
    console.log(e.target.files);
    // e.target.files is an array; desired img file is in index 0
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const data = new FormData();
    data.append('receiptImg', selectedFile);
    // data.append('selectedListingData', selectedListingData);
    recordPurchase(dispatch, data, selectedListingData.id, totalQuantityOrdered);

    setMode(PAGE_NAMES.CONFIRMATION_OF_RECEIPT);
    // writeStorage('mode', PAGE_NAMES.CONFIRMATION_OF_RECEIPT);
  };

  const handleCancelImageBtn = () => {
    setSelectedFile(null);
  };

  const manageDisplay = () => {
    if (selectedFile !== null) {
      return (
        <div style={{
          height: '60vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center',
        }}
        >
          <button
            type="button"
            className="closeButton"
            onClick={handleCancelImageBtn}
            style={{
              // height: '1.3rem', position: 'absolute', top: '0', right: '1em', backgroundColor: 'transparent', border: 'none',
              height: '1.8rem', width: '1.8rem', position: 'absolute', bottom: '1rem', backgroundColor: 'rgba(205, 205, 205, 0.7)', borderRadius: '50%', border: 'none',
            }}
          >
            ❌
          </button>
          <img src={URL.createObjectURL(selectedFile)} alt="userUploadedReceipt" />
        </div>
      );
    }
    return (
      <form method="/addReceipt" action="#" id="#" encType="multipart/form-data">
        <div className="form-group files">
          <label htmlFor="receiptImg">
            Upload Your File
            <input type="file" id="receiptImg" name="receiptImg" className="" onChange={(e) => handleFileSelection(e)} />
          </label>
        </div>
      </form>
    );
  };

  const handleBackNavBtn = () => {
    setMode(PAGE_NAMES.PAYMENT_INSTRUCTIONS);
  };
  return (
    <div className="container m-4 ml-auto mr-auto">
      <div className="row">
        <div className="col payment-form-progress-bar">
          <button type="button" onClick={handleBackNavBtn}>⬅️ Payment instructions</button>
        </div>
      </div>
      <div className="row">
        <div className="col summary">
          {/* insert the summary of item purchased, qty, price per unit, and total price */}
        </div>
      </div>
      <div className="row">
        <div className="col">
          {manageDisplay()}
        </div>
      </div>
      <div className="row">
        <div className="col">

          <Button type="button" className="btn btn-secorndary" onClick={handleFileUpload}>
            Upload
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* <Button className="btn btn-primary" onClick={handleBtnClick}> */}
          {/* <Button> */}
          {/* Next */}
          {/* </Button> */}
        </div>
      </div>
    </div>
  );
}

// UploadReceipt.propTypes = {
//   setMode: PropTypes.func.isRequired,
//   PAGE_NAMES: PropTypes.objectOf.isRequired,
// };
