import React, { useState, useContext, useEffect } from 'react';
import {
  Form, Button, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { CreateListingContext, loadCategories } from '../../createListingStore.jsx';
import { getUserIdFromCookie } from '../../helper.js';

export default function AboutItem({ setMode }) {
  const [allCategories, setAllCategories] = useState([]);
  const { formStore, dispatchListingForm, handleOnChange } = useContext(CreateListingContext);

  const handleNextPage = () => {
    setMode('QTY_AND_PRICE');
  };

  const handleCancelForm = () => {
    // setMode('ABOUT_ITEMS');
  };

  // Change the title of the dropdown button when a category is selected
  const handleSelectCategory = (category) => {
    dispatchListingForm({ field: 'category', value: category });
  };

  useEffect(() => {
    const currUserId = getUserIdFromCookie();
    dispatchListingForm({ field: 'lister_id', value: currUserId });
  }, []);
  console.log(formStore, 'formStore');

  const arrOfCategoriesDropDown = allCategories.map((category, i) => (
    <Dropdown.Item
      name="category"
      key={category}
      onClick={() => { handleSelectCategory(category); }}
    >
      {category}
    </Dropdown.Item>
  ));

  // Load all categories available in the database
  useEffect(() => {
    loadCategories(setAllCategories);
  }, []);

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

      <DropdownButton id="dropdown-basic-button" title={formStore.category} variant="outline-dark">
        {arrOfCategoriesDropDown}
      </DropdownButton>

      <div className="d-flex flex-row justify-content-between mt-3">
        <Button variant="danger" onClick={handleCancelForm}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </Form>
  );
}
