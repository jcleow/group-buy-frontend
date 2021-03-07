import React, { useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import { CreateListingContext, CREATE_LISTING_FORM, formModes } from '../../createListingStore.jsx';
import { BACKEND_URL, selectListing, GroupBuyContext } from '../../store.jsx';

axios.defaults.withCredentials = true;
export default function TnC({ setMode }) {
  const {
    formStore, handleOnChange, dispatchListingForm, formLocalStorage,
  } = useContext(CreateListingContext);

  const { store, dispatch } = useContext(GroupBuyContext);
  const { selectedListingData, loggedInUserId } = store;

  const {
    FORM_STEP, CAMPAIGN_DATES, SUBMITTED,
  } = formModes;

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
    const updatedFormFields = {
      ...formLocalStorage,
      tnc: formLocalStorage.tnc ? formLocalStorage.tnc : formStore.tnc,
      startDate: moment(formLocalStorage.startDate).toDate(),
      endDate: moment(formLocalStorage.endDate).toDate(),
      deliveryDate: moment(formLocalStorage.endDate).toDate(),
      listerId: loggedInUserId,
    };
    let newListingId;

    console.log(updatedFormFields, 'updatedFormStore');
    //* ** to shift into createListingStore */
    axios.post(`${BACKEND_URL}/createListing`, { updatedFormStore: updatedFormFields })
      .then((result) => {
        setMode(SUBMITTED);
        deleteFromStorage(CREATE_LISTING_FORM);
        deleteFromStorage(FORM_STEP);
        newListingId = result.data.newListing.id;
        return handleUploadPictures(newListingId);
      })
      .then(() => {
        // Once loading is complete on the backend,
        // redirect user to the newly created listing
        selectListing(dispatch, newListingId);
        window.location = `/listingdetails/${newListingId}`;
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
          rows={20}
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
