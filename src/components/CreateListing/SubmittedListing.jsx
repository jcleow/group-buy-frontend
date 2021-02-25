import React, { useContext } from 'react';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { deleteFromStorage } from '@rehooks/local-storage';
import { CreateListingContext, CREATE_LISTING_FORM } from '../../createListingStore.jsx';

export default function SubmittedListing({ setMode }) {
  const { formStore } = useContext(CreateListingContext);

  const arrOfFormLabels = Object.entries(formStore).map(([key, value], idx) => (
    <div key={`${value + idx}`}>
      <b>{key}</b>
      :
      {(key === 'startDate' || key === 'endDate' || key === 'deliveryDate')
        ? moment(value).format('DD-MM-YYYY')
        : value.toString()}
    </div>
  ));

  const handlePrevPage = () => {
    setMode('TERMS_AND_CONDITIONS');
  };

  const handleReturnToHome = () => {
    window.location.href = '/home';
    deleteFromStorage(CREATE_LISTING_FORM);
    deleteFromStorage('formstep');
  };

  return (
    <Form>
      {arrOfFormLabels}
      <div className="d-flex flex-row justify-content-between">
        <Button onClick={handlePrevPage}> Previous </Button>
        <Button variant="info" onClick={handleReturnToHome}> Return to Home </Button>
      </div>
    </Form>
  );
}
