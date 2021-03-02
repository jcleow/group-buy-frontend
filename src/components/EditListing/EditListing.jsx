/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import { GroupBuyContext, LISTING_VIEW_MODES } from '../../store.jsx';
import { getListingCurrentStatus, calcDiscountPct, findRelativeSaleEndingTime } from '../utility/listingHelper.js';
import './EditListing.css';

export default function EditListing() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { selectedListingData, categories } = store;
  const [editData, setEditData] = useState({ ...selectedListingData });

  const titleElement = useRef(null);

  const handleEdit = (colName) => {
    titleElement.current.contentEditable = true;
  };

  const getEditIcon = (colName) => (<button type="button" className="btn btn-sm" onClick={() => handleEdit(colName)}><sup className="edit-icon">&#9998;</sup></button>);

  const handleOnChange = (event, attrName) => {
    const modifiedData = { ...editData };
    modifiedData[attrName] = event.target.value;
    setEditData({ ...modifiedData });
  };

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
      <div className="row mt-3 ml-3 pl-2">
        <div className="col-4 muted font-italic">Description</div>
        <div className="col-8">
          <textarea type="text" id="new-description" className="border-0" rows="4" value={editData.description} onChange={(event) => handleOnChange(event, 'description')} />
        </div>
      </div>

      {/* usual Price */}
      <div className="row mt-3 ml-3">
        <div className="col-4 muted font-italic">
          Usual Price ($)
        </div>
        <div className="col-8">
          <input type="number" id="new-usual-price" step="0.01" className="border-0" value={`${editData.usualPrice}`} onChange={(event) => handleOnChange(event, 'usualPrice')} />
        </div>
      </div>
      {/* discounted price */}
      <div className="row mt-3 ml-3">
        <div className="col-4 muted font-italic">
          Discounted Price ($)
        </div>
        <div className="col-8">
          <input type="number" id="new-discounted-price" step="0.01" className="border-0" value={`${editData.discountedPrice}`} onChange={(event) => handleOnChange(event, 'discountedPrice')} />
        </div>
      </div>
      <div className="row mt-3 ml-3 muted font-italic">
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
      <div className="row mt-3 ml-3">
        <div className="col-4 muted font-italic">
          Quantity available
        </div>
        <div className="col-8">
          <input type="number" id="new-quantity" className="border-0" value={`${editData.quantity}`} onChange={(event) => handleOnChange(event, 'quantity')} />
        </div>
      </div>
      {/* allowOversubscription */}
      <div className="row mt-3 ml-3">
        <div className="col">
          <input type="checkbox" id="new-allow-oversubscription" className="border-0 mr-3" value={`${editData.allowOversubscription}`} onChange={(event) => handleOnChange(event, 'allowOversubscription')} />
          <span className="muted font-italic">
            Allow oversubscription
            {' '}
            <sm className="small">[allows subscription beyond the given quantity]</sm>
          </span>
        </div>
      </div>

      {/* moq */}
      <div className="row mt-3 ml-3">
        <div className="col-4 muted font-italic">
          Minimum Order Quantity (MOQ)
        </div>
        <div className="col-8">
          <input type="number" id="new-moq" className="border-0" value={`${editData.moq}`} onChange={(event) => handleOnChange(event, 'moq')} />
        </div>
      </div>

      {/* deliveryDate */}
      {/* deliveryMode */}

      {/* endDate */}
      {/* startDate */}
      {/* images */}
      {/* listingStatus */}

      {/* tnc */}

      <div className="row mt-2 ml-3 mr-3 p-2">
        <div />
        <div className="col">
          {/* Displays image */}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Status:</span>
          {' '}
          {getListingCurrentStatus(editData.listingStatus)}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">
            Category:
          </span>
          {' '}
          {editData.category}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Start Date:</span>
          {' '}
          {' '}
          {new Date(editData.startDate).toDateString()}
        </div>
      </div>
      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">End Date:</span>
          {' '}
          {' '}
          {new Date(editData.endDate).toDateString()}
        </div>
      </div>
      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Delivery Mode:</span>
          {' '}
          {editData.deliveryMode}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Listed By:</span>
          {' '}
          {editData.listerId}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <h6>
            Details of
            { ' '}
            {editData.title}
          </h6>
        </div>
        <div className="col-12">
          <p>
            {editData.description}
          </p>
        </div>
      </div>
      <div className="row mt-3 ml-3">
        <div className="col">
          <h6>
            Terms and Conditions:
          </h6>
        </div>
        <div className="col-12">
          <p>
            {editData.tnc}
          </p>
        </div>
      </div>

    </div>
  );
}
