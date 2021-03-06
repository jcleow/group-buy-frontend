import React, { useState, useContext, useEffect } from 'react';
import './createListing.css';
import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import {
  Form, Button, Dropdown, DropdownButton,
} from 'react-bootstrap';
import Asterisk from './Asterisk.jsx';
import {
  CreateListingContext, CREATE_LISTING_FORM, loadCategories, formModes,
} from '../../createListingStore.jsx';
import { getUserIdFromCookie } from '../../helper.js';

// Helper
const generateAllImageLocations = (files) => {
  const allImageLocations = Object.entries(files).map(([key, file]) => {
    if (key !== 'length') {
      return URL.createObjectURL(file);
    }
    return null;
  });
  return allImageLocations;
};

export default function AboutItem({ setMode }) {
  const CATEGORY = 'category';
  const IMAGES = 'images';
  const [allCategories, setAllCategories] = useState([]);
  const [imgLocations, setImgLocations] = useState([]);
  const {
    formStore, dispatchListingForm, handleOnChange, formLocalStorage,
  } = useContext(CreateListingContext);

  const { QTY_AND_PRICE, FORM_STEP } = formModes;
  // If there is no storage relating to the form, create one now
  if (!formLocalStorage) {
    writeStorage(CREATE_LISTING_FORM, {});
  }

  const handleCancelForm = () => {
    // setMode('ABOUT_ITEMS');
    window.location.href = '/home';
    deleteFromStorage(CREATE_LISTING_FORM);
    deleteFromStorage(FORM_STEP);
  };

  // Change the title of the dropdown button when a category is selected
  const handleSelectCategory = (category) => {
    dispatchListingForm({ field: CATEGORY, value: category });
    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [CATEGORY]: category });
  };

  const handleNextPage = () => {
    setMode(QTY_AND_PRICE);
    writeStorage(FORM_STEP, QTY_AND_PRICE);
  };

  // Create a ref to hidden file input element
  const hiddenFileInput = React.useRef(null);

  const handleClickUpload = () => {
    hiddenFileInput.current.click();
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
    dispatchListingForm({ field: IMAGES, value: e.target.files });
    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [IMAGES]: [...e.target.files] });

    const allImageLocations = generateAllImageLocations(e.target.files);
    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, imageLocations: [...allImageLocations] });
    setImgLocations([...imgLocations, ...allImageLocations]);
  };
  console.log(formLocalStorage.images?.get('File'));

  const handleDeleteUploadedPicture = (idx) => {
    const remainingImagesUploaded = formLocalStorage.images.splice(idx, 1);
    const remainingImageLocations = imgLocations.splice(idx, 1);

    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [IMAGES]: [...remainingImagesUploaded] });
    console.log(formLocalStorage.images?.getAll('File'));

    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, imageLocations: [...remainingImageLocations] });
    setImgLocations([...remainingImageLocations]);
  };

  const validationToProceed = () => formLocalStorage.title && formLocalStorage.description && formLocalStorage.category;

  const displayImages = () => {
    const images = formLocalStorage.imageLocations.map((location, i) => (
      <div className="col uploaded-img-container">
        <div className="d-flex justify-content-end delete-img-btn">
          <button
            type="button"
            className="btn btn-sm"
            aria-label="Close"
            onClick={() => { handleDeleteUploadedPicture(i); }}
          >
            <span className="delete-img" aria-hidden="true">&times;</span>
          </button>
        </div>
        <img className="rounded uploaded-img" src={location} alt="uploaded img" />
      </div>

    ));
    return images;
  };

  // Load all categories available in the database
  useEffect(() => {
    loadCategories(setAllCategories);
  }, []);

  return (
    <Form>
      <div className="col payment-form-progress-bar d-flex flex-row justify-content-start">
        <div className="create-listing-header ml-1">About Item (1/4)</div>
      </div>
      <Form.Group className="ml-3 mt-3" controlId="formBasicEmail">
        <Form.Label>
          Title
          <Asterisk />
        </Form.Label>
        <Form.Control
          name="title"
          type="text"
          placeholder="Title of Campaign"
          value={formLocalStorage.title ? formLocalStorage.title : formStore.title}
          onChange={handleOnChange}
          required
        />
        <Form.Text className="text-muted">
          {'Enter a catchy title to grab people\'s attentions!'}
        </Form.Text>
      </Form.Group>

      <Form.Group className="ml-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          Description
          <Asterisk />
        </Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          value={formLocalStorage.description ? formLocalStorage.description : formStore.description}
          onChange={handleOnChange}
          placeholder="Describe in detail the relevant product/service that you are offering."
          required
        />
      </Form.Group>
      <Form.Group className="ml-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          Choose a Category
          <Asterisk />
        </Form.Label>
        <DropdownButton
          id="dropdown-basic-button"
          title={formLocalStorage.category ? formLocalStorage.category : formStore.category}
          variant="outline-dark"
        >
          {arrOfCategoriesDropDown}
        </DropdownButton>
      </Form.Group>
      <Form.Group className="ml-3 mt-4" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Upload pictures for your campaign</Form.Label>
        <div>
          <Button role="button" variant="outline-primary" onClick={handleClickUpload}>Upload Files</Button>
        </div>
      </Form.Group>
      <input
        className="ml-3 mt-3"
        type="file"
        name="campaignImages"
        multiple
        style={{ display: 'none' }}
        onChange={handleUploadPictures}
        ref={hiddenFileInput}
      />
      {/* Uploaded Images */}
      <div className="d-flex flex-row justify-content-start mt-3">
        <div className="row d-flex justify-content-between">
          {formLocalStorage.imageLocations && displayImages()}
        </div>
      </div>

      <div className="d-flex flex-row justify-content-center mt-5 mb-3">
        {
          validationToProceed()
            ? (<Button variant="primary" onClick={handleNextPage}> Next </Button>)
            : (<Button variant="primary" disabled> Next </Button>)
        }
      </div>

      <div className="d-flex flex-row justify-content-center mt-5">
        <Button variant="danger" onClick={handleCancelForm}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
