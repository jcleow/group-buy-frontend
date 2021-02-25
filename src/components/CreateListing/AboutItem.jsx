import React, { useState, useContext, useEffect } from 'react';
import { writeStorage } from '@rehooks/local-storage';
import {
  Form, Button, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { CreateListingContext, CREATE_LISTING_FORM, loadCategories } from '../../createListingStore.jsx';
import { getUserIdFromCookie } from '../../helper.js';

export default function AboutItem({ setMode }) {
  const CATEGORY = 'category';
  const [allCategories, setAllCategories] = useState([]);
  const {
    formStore, dispatchListingForm, handleOnChange, formLocalStorage,
  } = useContext(CreateListingContext);

  // If there is no storage relating to the form, create one now
  if (!formLocalStorage) {
    writeStorage(CREATE_LISTING_FORM, {});
  }

  const handleCancelForm = () => {
    // setMode('ABOUT_ITEMS');
  };

  // Change the title of the dropdown button when a category is selected
  const handleSelectCategory = (category) => {
    dispatchListingForm({ field: CATEGORY, value: category });
    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [CATEGORY]: category });
  };

  const handleNextPage = () => {
    setMode('QTY_AND_PRICE');
    writeStorage('formstep', 'QTY_AND_PRICE');
  };

  useEffect(() => {
    const currUserId = getUserIdFromCookie();
    dispatchListingForm({ field: 'lister_id', value: currUserId });
  }, []);

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
          required
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
          required
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
