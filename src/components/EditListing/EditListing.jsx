/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { GroupBuyContext, LISTING_VIEW_MODES } from '../../store.jsx';
import { getListingCurrentStatus, calcDiscountPct, getListingStatusDesc } from '../utility/listingHelper.js';
import './EditListing.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default function EditListing() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { selectedListingData, categories, listingStatus } = store;
  const [editData, setEditData] = useState({ ...selectedListingData });
  // Focus states for dateRangePicker and singleDatePicker
  const [rangeFocus, setRangeFocus] = useState(false);
  const [deliveryFocus, setDeliveryFocus] = useState(false);

  const listingStatusDesc = getListingStatusDesc(listingStatus);

  // const titleElement = useRef(null);
  // const handleEdit = (colName) => {
  //   titleElement.current.contentEditable = true;
  // };
  // const getEditIcon = (colName) => (<button type="button" className="btn btn-sm" onClick={() => handleEdit(colName)}><sup className="edit-icon">&#9998;</sup></button>);

  const handleOnChange = (event, attrName) => {
    const modifiedData = { ...editData };
    modifiedData[attrName] = event.target.value;
    setEditData({ ...modifiedData });
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    const modifiedData = { ...editData };
    if (startDate) {
      modifiedData.startDate = startDate;
    }
    if (endDate) {
      modifiedData.endDate = endDate;
    }
    setEditData({ ...modifiedData });
  };

  const handleDeliveryDateChange = (newDeliveryDate) => {
    const modifiedData = { ...editData };
    modifiedData.deliveryDate = newDeliveryDate;
    setEditData({ ...modifiedData });
  };

  const borderElement = () => (<div className="mt-2 mr-5 ml-5 border-bottom" />);

  return (
    <div className="container mt-4 shadow p-3">
      <h4 className="text-center mt-3">Edit Listing</h4>
      <small className="text-muted form-text font-italic">[Click on the values to edit]</small>

      {/** Title */}
      <div className="row mt-3 ml-3 p-2">
        <div className="col-4 muted font-italic">
          Title of Campaign
        </div>
        <div className="col-8 h5 text-capitalize">
          <input type="text" id="new-title" className="border-0 text-capitalize font-weight-bolder" value={editData.title} onChange={(event) => handleOnChange(event, 'title')} />
        </div>
      </div>
      {/* category  */}
      {borderElement()}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Category</div>
        <div className="col-8">
          <select
            id="new-category"
            className="form-select border-0 text-capitalize"
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
          <input type="checkbox" id="new-allow-oversubscription" className="border-0 mr-3" value={`${editData.allowOversubscription}`} onChange={(event) => handleOnChange(event, 'allowOversubscription')} />
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
          {/* <SingleDatePicker
            date={editData.deliveryDate}
            onDateChange={handleDeliveryDateChange}
            focused={deliveryFocus}
            onFocusChange={({ focused }) => {
              setDeliveryFocus(focused); }}
            id="delivery-dates"
          /> */}
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
        <div className="col-8">
          {/* <DateRangePicker
            startDate={new Date(editData.startDate)}
            startDateId={`${editData.startDate}id`}
            endDate={new Date(editData.endDate)}
            endDateId={`${editData.endDate}id`}
            onDatesChange={handleDatesChange}
            focusedInput={rangeFocus}
            onFocusChange={(focus) => setRangeFocus(focus)}
          /> */}
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

      {/* images */}

      {borderElement()}
      {/* tnc */}
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Terms and Conditions</div>
        <div className="col-8">
          <textarea type="text" id="new-tnc" className="border-0" rows="4" value={editData.tnc} onChange={(event) => handleOnChange(event, 'tnc')} />
        </div>
      </div>

      <div className="row mt-2 ml-3 mr-3 p-2">
        <div />
        <div className="col">
          {/* Displays image */}
        </div>
      </div>

    </div>
  );
}
