/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import moment from 'moment';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import {
  GroupBuyContext, selectListingAction, updateListing,
  selectListing, loadCategoriesAction, loadListingStatusesAction,
} from '../../store.jsx';
import { calcDiscountPct, getListingStatusDesc } from '../utility/listingHelper.js';
import './EditListing.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default function EditListing() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const {
    selectedListingData, categories, listingStatus,
  } = store;
  const [localStoreEditedListingData, setEditedListingData, deleteEditedListingData] = useLocalStorage('editedListingData');
  const [getAddedImages, setAddedImages, deleteAddedImages] = useLocalStorage('addedImages');
  const [storedCategories] = useLocalStorage('categories');
  const [storedListingStatus] = useLocalStorage('listingStatus');
  const { listingId } = useParams();

  const getDefaultLoadingListingData = () => {
    if (localStoreEditedListingData) {
      if (localStoreEditedListingData.id === listingId) {
        return localStoreEditedListingData;
      }
      selectListing(dispatch, listingId);
      return selectedListingData;
    }
    if (selectedListingData.id === listingId) {
      return selectedListingData;
    }
    selectListing(dispatch, listingId);
    return selectedListingData;
  };

  const [editData, setEditData] = useState((localStoreEditedListingData)
    ? { ...localStoreEditedListingData } : { ...selectedListingData });

  const setDefaultData = () => {
    if (!categories || categories.length === 0) {
      dispatch(loadCategoriesAction(storedCategories));
    }
    if (!listingStatus || listingStatus.length === 0) {
      dispatch(loadListingStatusesAction(storedListingStatus));
    }
  };

  if (!editData) {
    setEditData({ ...getDefaultLoadingListingData() });
    setDefaultData();
  }

  useEffect(() => {
    if (!editData) {
      setEditData({ ...getDefaultLoadingListingData() });
    }
    setDefaultData();
    writeStorage('editedListingData', { ...editData });
  }, []);

  // Focus states for dateRangePicker and singleDatePicker
  const [rangeFocus, setRangeFocus] = useState(false);
  const [deliveryFocus, setDeliveryFocus] = useState(false);

  const [newImagesUploaded, setNewImagesUploaded] = useState((getAddedImages)
    ? [...getAddedImages] : []);

  const listingStatusDesc = getListingStatusDesc(listingStatus);

  const setModifiedDataAsEditData = (modifiedData) => {
    setEditData({ ...modifiedData });
    if (localStoreEditedListingData) {
      setEditedListingData({ ...modifiedData });
    }
    else {
      writeStorage('editedListingData', { ...modifiedData });
    }
  };

  const handleOnChange = (event, attrName) => {
    const modifiedData = { ...editData };
    if (attrName === 'allowOversubscription') {
      modifiedData[attrName] = event.target.checked;
    } else {
      modifiedData[attrName] = event.target.value;
    }
    setModifiedDataAsEditData({ ...modifiedData });
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    const modifiedData = { ...editData };
    if (startDate) {
      modifiedData.startDate = startDate.format();
    }
    if (endDate) {
      modifiedData.endDate = endDate.format();
    }
    setModifiedDataAsEditData({ ...modifiedData });
  };

  const handleDeliveryDateChange = (newDeliveryDate) => {
    const modifiedData = { ...editData };
    modifiedData.deliveryDate = moment(newDeliveryDate).toDate();
    setModifiedDataAsEditData({ ...modifiedData });
  };

  // To delete images given the index
  const removeImageFromEditData = (imageIndex) => {
    // Remove the image at the index
    const modifiedData = { ...editData };
    delete modifiedData.images[`img${imageIndex + 1}`];
    console.log(modifiedData.images);
    setModifiedDataAsEditData({ ...modifiedData });
  };

  const handleImageClose = (imageKeyOrIndex, fromEditData) => {
    // Remove the image at the index
    if (fromEditData) {
      const modifiedData = { ...editData };
      delete modifiedData.images[imageKeyOrIndex];
      setModifiedDataAsEditData({ ...modifiedData });
    }
    else {
      newImagesUploaded.splice(imageKeyOrIndex, 1);
      setAddedImages([...newImagesUploaded]);
    }
  };

  const handleUploadPictures = (event) => {
    setNewImagesUploaded([...newImagesUploaded, ...event.target.files]);
    writeStorage('addedImages', [...newImagesUploaded]);
  };

  const handleCancel = () => {
    dispatch(selectListingAction(selectedListingData));
    deleteEditedListingData();
    deleteAddedImages();
  };

  const handleSaveChanges = () => {
    writeStorage('editedListingData', { ...editData });
    writeStorage('addedImages', [...newImagesUploaded]);
    const imageFormData = new FormData();
    Object.entries(newImagesUploaded).forEach(([key, value]) => {
      if (key !== 'length') {
        imageFormData.append('file', value);
      }
    });

    updateListing(dispatch, editData, imageFormData);
    deleteEditedListingData();
    deleteAddedImages();
  };

  const borderElement = () => (<div className="mt-2 mr-5 ml-5 border-bottom" />);

  const displayImage = (imageKeyOrSource, index, fromEditData) => (
    <div key={`imgs-${Number(index)}`} className="border-0 mr-1 mt-4">
      <div className="mb-4 close-div">
        <button
          type="button"
          className="close btn btn-sm"
          aria-label="Close"
          onClick={() => (
            handleImageClose(imageKeyOrSource, fromEditData)
          )}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <img src={(fromEditData) ? editData.images[imageKeyOrSource] : imageKeyOrSource.name} className="rounded card-img-top edit-img" alt="..." />
    </div>
  );

  return (

    <div className="container mt-4 shadow p-3">
      <h4 className="text-center mt-3">Edit Listing</h4>
      <small className="text-muted form-text font-italic">[Click on the values to edit]</small>

      {/** Title */}
      <div className="row mt-3 ml-3 p-2">
        <div className="col-4 muted font-italic">
          Title of Campaign
        </div>
        <div className="col-8 h5">
          <input type="text" id="new-title" className="border-0 font-weight-bolder" value={editData.title} onChange={(event) => handleOnChange(event, 'title')} />
        </div>
      </div>
      {/* category  */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Category</div>
        <div className="col-8">
          <select
            id="new-category"
            className="form-select border-0"
            value={editData.category}
            onChange={(event) => handleOnChange(event, 'category')}
          >
            {categories.map((categoryOption, index) => (
              <option key={`option-${Number(index)}`} value={categoryOption} selected={(categoryOption === editData.category)}>{categoryOption}</option>
            ))}
          </select>
        </div>
      </div>

      {/* description */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Description</div>
        <div className="col-8">
          <textarea type="text" id="new-description" className="border-0" rows="4" value={editData.description} onChange={(event) => handleOnChange(event, 'description')} />
        </div>
      </div>

      {borderElement()}
      {/* usual Price */}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">
          Usual Price ($)
        </div>
        <div className="col-8">
          <input type="number" id="new-usual-price" step="0.01" className="border-0" value={`${editData.usualPrice}`} onChange={(event) => handleOnChange(event, 'usualPrice')} />
        </div>
      </div>
      {/* discounted price */}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">
          Discounted Price ($)
        </div>
        <div className="col-8">
          <input type="number" id="new-discounted-price" step="0.01" className="border-0" value={`${editData.discountedPrice}`} onChange={(event) => handleOnChange(event, 'discountedPrice')} />
        </div>
      </div>
      <div className="row mt-3 ml-3 pl-2 muted font-italic">
        <div className="col-4">
          Discount:
          {' '}
        </div>
        <div className="col">
          {calcDiscountPct(editData.discountedPrice, editData.usualPrice)}
          %
        </div>
      </div>

      {/* quantity */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">
          Quantity available
        </div>
        <div className="col-8">
          <input type="number" id="new-quantity" className="border-0" value={`${editData.quantity}`} onChange={(event) => handleOnChange(event, 'quantity')} />
        </div>
      </div>
      {/* allowOversubscription */}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <input type="checkbox" id="new-allow-oversubscription" className="border-0 mr-3" checked={editData.allowOversubscription} onChange={(event) => handleOnChange(event, 'allowOversubscription')} />
          <span className="muted font-italic">
            Allow oversubscription
            {' '}
            <small>[allows subscription beyond the given quantity]</small>
          </span>
        </div>
      </div>

      {/* moq */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">
          Minimum Order Quantity (MOQ)
        </div>
        <div className="col-8">
          <input type="number" id="new-moq" className="border-0" value={`${editData.moq}`} onChange={(event) => handleOnChange(event, 'moq')} />
        </div>
      </div>

      {/* deliveryDate */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">
          Delivery Date:
        </div>
        <div className="col-8">
          <SingleDatePicker
            date={moment(editData.deliveryDate)}
            onDateChange={handleDeliveryDateChange}
            focused={deliveryFocus}
            onFocusChange={({ focused }) => {
              setDeliveryFocus(focused); }}
            id="delivery-dates"
          />
        </div>
      </div>

      {/* deliveryMode */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">
          Delivery Mode
        </div>
        <div className="col-8">
          <div className="form-check form-check-inline border-0">
            <input className="form-check-input" type="radio" name="delivery-mode-options" id="pickup-mode" value="pickup" checked={editData.deliveryMode === 'pickup'} onChange={(event) => handleOnChange(event, 'deliveryMode')} />
            <label className="form-check-label" htmlFor="pickup-mode">Pick up</label>
          </div>
          <div className="form-check form-check-inline border-0">
            <input className="form-check-input" type="radio" name="delivery-mode-options" id="electronic-mode" value="electronic" checked={editData.deliveryMode === 'electronic'} onChange={(event) => handleOnChange(event, 'deliveryMode')} />
            <label className="form-check-label" htmlFor="electronic-mode">Electronic</label>
          </div>
        </div>
      </div>

      {/* endDate */}
      {/* startDate */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">
          Campaign Start and End Date
        </div>
        <div>
          <DateRangePicker
            startDate={moment(editData.startDate)}
            startDateId={`${editData.startDate}id`}
            endDate={moment(editData.endDate)}
            endDateId={`${editData.endDate}id`}
            onDatesChange={handleDatesChange}
            focusedInput={rangeFocus}
            onFocusChange={(focus) => setRangeFocus(focus)}
          />
        </div>
      </div>

      {/* listingStatus */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Status</div>
        <div className="col-8">
          <select
            id="new-category"
            className="form-select border-0 text-capitalize"
            value={editData.listingStatus}
            onChange={(event) => handleOnChange(event, 'listingStatus')}
          >
            {listingStatus.map((listingStatusOption, index) => (
              <option key={`option-${Number(index)}`} value={listingStatusOption} selected={(listingStatusOption === editData.listingStatus)}>{listingStatusDesc[listingStatusOption]}</option>
            ))}
          </select>
        </div>
      </div>

      {borderElement()}
      {/* tnc */}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Terms and Conditions</div>
        <div className="col-8">
          <textarea type="text" id="new-tnc" className="border-0" rows="4" value={editData.tnc} onChange={(event) => handleOnChange(event, 'tnc')} />
        </div>
      </div>

      {/* Displays image */}
      {borderElement()}
      <div className="row mt-2 ml-3 mr-3 p-2">
        <div className="col-4 muted font-italic">Images</div>
        <div className="row row-cols-2 row-cols-sm-4 row-cols-lg-5 mt-3 ml-3 mr-3 p-2">
          {Object.keys(editData.images).map((imgKey, index) => (
            displayImage(imgKey, index, true)
          ))}
          {/* {newImagesUploaded.map((imageSrc, arrIndex) => (
            displayImage(imageSrc, arrIndex, false)
          ))} */}
        </div>
      </div>

      {/* Upload images */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Upload more images</div>
        <div className="col-8">
          <input type="file" name="campaignImages" multiple onChange={handleUploadPictures} />
        </div>
      </div>

      {/* Save to db */}
      {borderElement()}
      <div className="row m-3 pl-2 justify-content-between">
        <div className="col-6">
          <LinkContainer to={`/listingdetails/${editData.id}`} onClick={handleCancel}>
            <span className="btn btn-sm btn-primary">Cancel</span>
          </LinkContainer>
        </div>
        <div className="col-6">
          <LinkContainer to={`/listingdetails/${editData.id}`} onClick={handleSaveChanges}>
            <span className="btn btn-sm btn-primary">Save</span>
          </LinkContainer>
        </div>
      </div>
    </div>
  );
}
