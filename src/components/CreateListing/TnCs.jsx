import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CreateListingContext } from '../../createListingStore.jsx';

export default function TnCs({ setMode }) {
  const { formStore, dispatchListingForm, handleOnChange } = useContext(CreateListingContext);

  // const handleOnChange = (e) => {
  //   dispatchListingForm({ field: e.target.name, value: e.target.value });
  // };

  const handleNextPage = () => {
    setMode('CAMPAIGN_DATES');
  };

  const handleSubmitForm = () => {
    setMode('ABOUT_ITEM');
  };

  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Terms and Conditions</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          value={formStore.description}
          onChange={handleOnChange}
        />
      </Form.Group>
      <div className="d-flex flex-row justify-content-between">
        <Button variant="primary" type="submit" onClick={handleNextPage}>
          Next
        </Button>
        <Button variant="danger" type="submit" onClick={handleSubmitForm}>
          Submit New Listing
        </Button>
      </div>
    </Form>
  );
}
