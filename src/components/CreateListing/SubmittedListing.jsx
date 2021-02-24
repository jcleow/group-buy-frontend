import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CreateListingContext } from '../../createListingStore.jsx';

export default function SubmittedListing({ setMode }) {
  const { formStore } = useContext(CreateListingContext);

  const handleReturnToHome = () => {
    window.location.href = '/home';
  };

  const arrOfFormLabels = Object.entries(formStore).map(([key, value], idx) => (
    <div key={`${key}`}>
      <b>{key}</b>
      :
      {value || 'Not filled'}
    </div>
  ));

  return (
    <Form>
      {arrOfFormLabels}
      <Button onClick={handleReturnToHome}> Return to Home </Button>
    </Form>
  );
}
