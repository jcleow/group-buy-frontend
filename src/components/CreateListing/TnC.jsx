import React, { useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { writeStorage } from '@rehooks/local-storage';
import { CreateListingContext, formModes } from '../../createListingStore.jsx';
import BACKEND_URL from '../../helper.js';

axios.defaults.withCredentials = true;
export default function TnC({ setMode }) {
  const { formStore, handleOnChange } = useContext(CreateListingContext);

  const { FORM_STEP, CAMPAIGN_DATES, SUBMITTED } = formModes;

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

    //* ** to shift into createListingStore */
    axios.post(`${BACKEND_URL}/createListing`, { updatedFormStore })
      .then((result) => {
        setMode(SUBMITTED);
        return handleUploadPictures(result.data.newListing.id);
      })
      .catch((error) => console.log(error));
  };

  const handlePrevPage = () => {
    setMode(CAMPAIGN_DATES);
    writeStorage(FORM_STEP, CAMPAIGN_DATES);
  };

  return (
    <Form>
      <div className="col payment-form-progress-bar d-flex flex-row justify-content-start">
        <button type="button" onClick={handlePrevPage}>⬅️ </button>
        <div className="create-listing-header ml-2">Terms and Conditions (4/4)</div>
      </div>
      <Form.Group className="ml-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Terms and Conditions</Form.Label>
        <Form.Control
          name="tnc"
          as="textarea"
          rows={10}
          value={formStore.tnc}
          onChange={handleOnChange}
        />
      </Form.Group>
      <div className="d-flex flex-column align-items-center">
        <Button variant="info" onClick={handleSubmitForm}>
          Submit New Listing
        </Button>
      </div>
    </Form>
  );
}
