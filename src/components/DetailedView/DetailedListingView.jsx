/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router';
import {
  GroupBuyContext, findPurchaseCountPerListing, LISTING_VIEW_MODES,
} from '../../store.jsx';
import ListingImagesCarousel from './ListingImagesCarousel.jsx';
import { calcDiscountPct, getListingCurrentStatus, isListingCancelled } from '../utility/listingHelper.js';
import './ListView.css';

export default function DetailedListingView({ children }) {
  const [progressPercent, setProgressPercent] = useState(0);
  const { store, dispatch } = useContext(GroupBuyContext);
  const { selectedListingData, currentListViewDisplayMode, totalQuantityOrdered } = store;
  const isImagesPresent = !(selectedListingData.images === undefined
    || selectedListingData.images == null);
  const { listingId } = useParams();
  // console.log('useParams listingId', listingId);

  const findRelativeSaleEndingTime = () => {
    const endDate = Date.parse(selectedListingData.endDate);
    const now = new Date();
    if ((endDate - now) < 0) {
      // If the deal is ended, no need to provide an option for buying
      // dispatch(setDisplayListingMode(LISTING_VIEW_MODES.DEFAULT_LISTING_VIEW));
      return 'Deal ended';
    }
    const momentEndDate = moment(selectedListingData.endDate);
    const momentNow = moment();
    const timeSpan = momentNow.to(momentEndDate);
    return (`Deal ends ${timeSpan}`);
  };

  const itemLabelClassNames = 'font-italic small font-weight-bold pr-1';

  return (
    <div className="container mt-4 p-3 detailed-view">
      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <h5 className="mt-2 text-capitalize">{selectedListingData.title}</h5>
        </div>
      </div>
      <div className="row mt-2 ml-3 mr-3 pl-2">
        <div />
        <div className="col">
          <figure className="figure">
            { !isImagesPresent && (
            <img src="/no-image-available-icon_m.jpg" className="figure-img img-fluid ending-soon-image border" alt="..." />
            )}
            { isImagesPresent && (
              <ListingImagesCarousel listImages={Object.values(selectedListingData.images)} />
            )}
            <figcaption className="figure-caption text-dark font-weight-bolder mt-1">{selectedListingData.title}</figcaption>
          </figure>
          {findPurchaseCountPerListing(listingId, setProgressPercent)}
          <div className="col col-md-6">
            <div className="progress">
              <div id="order-progress" className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{ width: `${progressPercent}%` }} aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
                {progressPercent}
                %
              </div>
            </div>
          </div>
          <div className="col text-muted order-progress-label">
            Ordered so far -
            {' '}
            { ' '}
            {progressPercent}
            %
          </div>
          <div className="mt-2">
            <span className="font-italic">{findRelativeSaleEndingTime()}</span>
          </div>
        </div>
      </div>
      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <span className="font-weight-bolder mr-2 pr-2 lead">
            $
            {Number(selectedListingData.discountedPrice).toFixed(2)}
          </span>
          <span className="mr-2 pr-2 text-muted">
            <del>
              $
              {Number(selectedListingData.usualPrice).toFixed(2)}
            </del>
          </span>

          {/* <span className={`${itemLabelClassNames}`}>Discount:</span> */}
          {' '}
          <span className="font-italic">
            save
            {' '}
            {Number(calcDiscountPct(selectedListingData.discountedPrice,
              selectedListingData.usualPrice)).toFixed(1)}
            % !
          </span>
        </div>
      </div>

      {(currentListViewDisplayMode !== LISTING_VIEW_MODES.LISTER_LISTING_VIEW
        && !isListingCancelled(selectedListingData.listingStatus)) && children}

      {(totalQuantityOrdered !== 0) && (
      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <span className={`${itemLabelClassNames}`}>Total Price:</span>
          {' '}
          {(Number(totalQuantityOrdered) * Number(selectedListingData.discountedPrice)).toFixed(2)}
        </div>
      </div>
      )}

      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <span className={itemLabelClassNames}>Quantity available:</span>
          { ' '}
          {selectedListingData.quantity}
          <span className={`${itemLabelClassNames} pl-1 ml-3`}>MOQ:</span>
          { ' '}
          {selectedListingData.moq}
        </div>
        {/* <div className="col"> */}
        {/* No:of purchases already */}
        {/* </div> */}
      </div>

      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <span className={`${itemLabelClassNames}`}>Status:</span>
          {' '}
          {getListingCurrentStatus(selectedListingData.listingStatus)}
        </div>
      </div>

      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <span className={`${itemLabelClassNames}`}>
            Category:
          </span>
          {' '}
          {selectedListingData.category}
        </div>
      </div>

      <div className="row mt-3 ml-3 pl-2 justify-content-start">
        <div className={`col-6 col-md-3  ${itemLabelClassNames}`}>Start Date:</div>
        <div className={`col-6 col-md-3 ${itemLabelClassNames}`}>End Date:</div>
      </div>
      <div className="row ml-3 pl-2 justify-content-start">
        <div className="col-6 col-md-3 ">{moment(new Date(selectedListingData.startDate)).format('DD/MM/YYYY')}</div>
        <div className="col-6 col-md-3 ">{moment(new Date(selectedListingData.endDate)).format('DD/MM/YYYY')}</div>
      </div>

      <div className="row mt-3 ml-3 pl-2 justify-content-start">
        <div className={`col-6 col-md-3 ${itemLabelClassNames}`}>Posted On:</div>
        <div className={`col-6 col-md-3 ${itemLabelClassNames}`}>Updated On:</div>
      </div>
      <div className="row ml-3 pl-2 justify-content-start">
        <div className="col-6 col-md-3">{moment(new Date(selectedListingData.createdAt)).format('DD/MM/YYYY')}</div>
        <div className="col-6 col-md-3">{moment(new Date(selectedListingData.updatedAt)).format('DD/MM/YYYY')}</div>
      </div>

      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <span className={`${itemLabelClassNames}`}>Delivery Mode:</span>
          {' '}
          {selectedListingData.deliveryMode}
        </div>
      </div>

      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <span className={`${itemLabelClassNames}`}>Listed By:</span>
          {' '}
          {selectedListingData.lister.username}
        </div>
      </div>

      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <h6 className={`${itemLabelClassNames}`}>
            Description:
          </h6>
        </div>
        <div className="col-12">
          <p className="desc-text">
            {selectedListingData.description}
          </p>
        </div>
      </div>
      <div className="row mt-3 ml-3 pl-2">
        <div className="col">
          <h6 className={`${itemLabelClassNames}`}>
            Terms and Conditions:
          </h6>
        </div>
        <div className="col-12">
          <p className="desc-text">
            {selectedListingData.tnc}
          </p>
        </div>
      </div>
      {(currentListViewDisplayMode === LISTING_VIEW_MODES.LISTER_LISTING_VIEW) && children}
    </div>
  );
}
