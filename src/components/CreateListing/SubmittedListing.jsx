import React, { useContext } from 'react';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { CreateListingContext } from '../../createListingStore.jsx';

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
    setMode('CAMPAIGN_DATES');
  };

  const handleReturnToHome = () => {
    window.location.href = '/home';
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
