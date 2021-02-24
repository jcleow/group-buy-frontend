import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function UploadReceipt({ setMode, PAGE_NAMES }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAGE_NAMES.CONFIRMATION_OF_RECEIPT);
  };

  const handleFileSelection = (e) => {
    console.log('uploading file');
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
    // e.target.files is an array; file is in index 0
  };

  const handleFileUpload = () => {
    const data = new FormData();
    data.append('file', selectedFile);
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

          <form method="post" action="#" id="#">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" name="receiptImg" className="form-control" onChange={(e) => handleFileSelection(e)} />
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
