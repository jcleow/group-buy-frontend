import React, { useContext } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { CreateListingContext } from '../../createListingStore.jsx';
import BACKEND_URL from '../../helper.js';

axios.defaults.withCredentials = true;
export default function TnCs({ setMode }) {
  const { formStore, handleOnChange } = useContext(CreateListingContext);

  const handleSubmitForm = () => {
    console.log('submitform');
    axios.post(`${BACKEND_URL}/createListing`, { formStore })
      .then((result) => {
        console.log(result, 'result');
        setMode('SUBMITTED');
      })
      .catch((error) => console.log(error));
  };
  console.log(formStore, 'formStore');

  const handlePrevPage = () => {
    setMode('CAMPAIGN_DATES');
  };

  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Terms and Conditions</Form.Label>
        <Form.Control
          name="tncs"
          as="textarea"
          rows={3}
          value={formStore.tncs}
          onChange={handleOnChange}
        />
      </Form.Group>
      <div className="d-flex flex-row justify-content-between">
        <Button variant="primary" type="submit" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="info" onClick={handleSubmitForm}>
          Submit New Listing
        </Button>
      </div>
    </Form>
  );
}
