import React, { useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { CreateListingContext } from '../../createListingStore.jsx';
import BACKEND_URL from '../../helper.js';

axios.defaults.withCredentials = true;
export default function TnC({ setMode }) {
  const { formStore, handleOnChange } = useContext(CreateListingContext);

  const handleUploadPictures = (listingId) => {
    const data = new FormData();

    Object.entries(formStore.images).forEach(([key, value]) => {
      if (key !== 'length') {
        data.append('file', value);
      }
    });

    return axios.post(`${BACKEND_URL}/listings/${listingId}/uploadCampaignPictures`, data)
      .catch((err) => console.log(err));
  };

  const handleSubmitForm = () => {
    let updatedFormStore = formStore;
    updatedFormStore = {
      ...formStore,
      startDate: moment(formStore.startDate).toDate(),
      endDate: moment(formStore.endDate).toDate(),
      deliveryDate: moment(formStore.endDate).toDate(),
    };

    axios.post(`${BACKEND_URL}/createListing`, { updatedFormStore })
      .then((result) => {
        console.log(result, 'result');
        setMode('SUBMITTED');
        return handleUploadPictures(result.data.newListing.id);
      })
      .catch((error) => console.log(error));
  };

  const handlePrevPage = () => {
    setMode('CAMPAIGN_DATES');
  };

  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Terms and Conditions</Form.Label>
        <Form.Control
          name="tnc"
          as="textarea"
          rows={3}
          value={formStore.tnc}
          onChange={handleOnChange}
        />
      </Form.Group>
      <div className="d-flex flex-row justify-content-between">
        <Button variant="primary" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="info" onClick={handleSubmitForm}>
          Submit New Listing
        </Button>
      </div>
    </Form>
  );
}
