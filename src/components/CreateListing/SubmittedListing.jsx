import React, { useContext } from 'react';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { CreateListingContext } from '../../createListingStore.jsx';

export default function SubmittedListing({ setMode }) {
  const { formStore } = useContext(CreateListingContext);

  const handleReturnToHome = () => {
    window.location.href = '/home';
  };

  const arrOfFormLabels = Object.entries(formStore).map(([key, value], idx) => (
    <div key={`${value + idx}`}>
      <b>{key}</b>
      :
      {(key === 'startDate' || key === 'endDate' || key === 'deliveryDate')
        ? moment(value).format('DD-MM-YYYY')
        : value}
    </div>
  ));

  return (
    <Form>
      {arrOfFormLabels}
      <Button onClick={handleReturnToHome}> Return to Home </Button>
    </Form>
  );
}
