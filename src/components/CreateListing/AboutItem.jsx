import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CreateListingContext } from '../../createListingStore.jsx';

export default function AboutItem({ setMode }) {
  const { formStore, handleOnChange } = useContext(CreateListingContext);

  const handleNextPage = () => {
    setMode('QTY_AND_PRICE');
  };

  const handleCancelForm = () => {
    // setMode('ABOUT_ITEMS');
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          type="text"
          placeholder="Title of Campaign"
          value={formStore.title}
          onChange={handleOnChange}
        />
        <Form.Text className="text-muted">
          {'Enter a catchy title to grab people\'s attentions!'}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
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

        <Button variant="danger" type="submit" onClick={handleCancelForm}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
