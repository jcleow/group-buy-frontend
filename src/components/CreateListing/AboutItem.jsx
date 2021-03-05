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

  const handleUploadPictures = (e) => {
    dispatchListingForm({ field: 'images', value: e.target.files });
  };

  // Load all categories available in the database
  useEffect(() => {
    loadCategories(setAllCategories);
  }, []);

  return (
    <Form>
      <div className="col payment-form-progress-bar d-flex flex-row justify-content-start">
        <div className="create-listing-header ml-1">About Item</div>
      </div>
      <Form.Group className="ml-3 mt-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          type="text"
          placeholder="Title of Campaign"
          value={formLocalStorage.title ? formLocalStorage.title : formStore.title}
          onChange={handleOnChange}
          required
        />
        <Form.Text className="text-muted ml-3 mt-3">
          {'Enter a catchy title to grab people\'s attentions!'}
        </Form.Text>
      </Form.Group>

      <Form.Group className="ml-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          value={formLocalStorage.description ? formLocalStorage.description : formStore.description}
          onChange={handleOnChange}
          required
        />
      </Form.Group>

      <DropdownButton
        className="ml-3 mt-3"
        id="dropdown-basic-button"
        title={formLocalStorage.category ? formLocalStorage.category : formStore.category}
        variant="outline-dark"
      >
        {arrOfCategoriesDropDown}
      </DropdownButton>
      <Button variant="outline-primary" className="ml-3 mt-3" type="file" name="campaignImages" multiple onChange={handleUploadPictures}> Upload Files </Button>
      <div className="d-flex flex-row justify-content-center mb-3">
        <Button variant="primary" onClick={handleNextPage}>
          Next
        </Button>
      </div>

      <div className="d-flex flex-row justify-content-center mt-5">
        <Button variant="danger" onClick={handleCancelForm}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
