import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { writeStorage } from '@rehooks/local-storage';
import { GroupBuyContext, saveReceiptToDb } from '../../store.jsx';
import PAGE_NAMES from '../utility/paymentPageNames.js';

export default function UploadReceipt({ setMode }) {
// create a state that saves the img of the paynow receipt
  const [selectedFile, setSelectedFile] = useState(null);
  // destructuring to get dispatch
  const { dispatch } = useContext(GroupBuyContext);

  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAGE_NAMES.CONFIRMATION_OF_RECEIPT);
    writeStorage('mode', PAGE_NAMES.CONFIRMATION_OF_RECEIPT);
  };

  const handleFileSelection = (e) => {
    console.log('uploading file');
    console.log(e.target.files);
    // e.target.files is an array; file is in index 0
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const data = new FormData();
    data.append('receiptImg', selectedFile);
    saveReceiptToDb(dispatch, data);
  };
  return (
    <>
      <div className="row">
        <div className="col summary">
          {/* insert the summary of item purchased, qty, price per unit, and total price */}
        </div>
      </div>
      <div className="row">
        <div className="col">

          <form method="/addReceipt" action="#" id="#" encType="multipart/form-data">
            <div className="form-group files">
              <label htmlFor="receiptImg">
                Upload Your File
                <input type="file" id="receiptImg" name="receiptImg" className="" onChange={(e) => handleFileSelection(e)} />
              </label>
            </div>
          </form>
          <Button type="button" className="btn btn-secorndary" onClick={handleFileUpload}>
            Upload
          </Button>
          {/* <form>
            <h3>React File Upload</h3>
            <div className="form-group">
              <input type="file" />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">Upload</button>
            </div>
          </form> */}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button className="btn btn-primary" onClick={handleBtnClick}>
            {/* <Button> */}
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

// UploadReceipt.propTypes = {
//   setMode: PropTypes.func.isRequired,
//   PAGE_NAMES: PropTypes.objectOf.isRequired,
// };
