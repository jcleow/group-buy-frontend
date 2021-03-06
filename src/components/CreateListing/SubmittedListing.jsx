import React, { useContext } from 'react';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { deleteFromStorage } from '@rehooks/local-storage';
import { CreateListingContext, CREATE_LISTING_FORM, formModes } from '../../createListingStore.jsx';

export default function SubmittedListing({ setMode }) {
  const { formStore } = useContext(CreateListingContext);
  const { FORM_STEP } = formModes;
  const arrOfFormLabels = Object.entries(formStore).map(([key, value], idx) => (
    <div key={`${value + idx}`}>
      <b>{key}</b>
      :
      {(key === 'startDate' || key === 'endDate' || key === 'deliveryDate')
        ? moment(value).format('DD-MM-YYYY')
        : value.toString()}
    </div>
  ));

  const handleReturnToHome = () => {
    window.location = '/';
    deleteFromStorage(CREATE_LISTING_FORM);
    deleteFromStorage(FORM_STEP);
  };

  return (
    <Form>
      {arrOfFormLabels}
      <div className="d-flex flex-row justify-content-center">
        <Button variant="info" onClick={handleReturnToHome}> Return to Home </Button>
      </div>
    </Form>
  );
}
