/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { GroupBuyContext, setDisplayListingMode, LISTING_VIEW_MODES } from '../store.jsx';
import ListingImagesCarousel from './ListingImagesCarousel.jsx';

export default function DetailedListingView({ children, totalQuantity }) {
  const [progressPercent, setProgressPercent] = useState(0);
  const [isImagesPresent, setIsImagesPresent] = useState(false);
  const { store, dispatch } = useContext(GroupBuyContext);
  const { selectedListingData, currentListViewDisplayMode, totalQuantityOrdered } = store;

  const LISTING_STATUSES = {
    BELOW_MOQ: 'below-moq',
    ABOVE_MOQ: 'above-moq',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
  };

  const getListingCurrentStatus = () => {
    switch (selectedListingData.listingStatus)
    {
      case LISTING_STATUSES.BELOW_MOQ: { return 'Not reached minimum order to activate the deal'; }
      case LISTING_STATUSES.ABOVE_MOQ: { return 'Reached minimum order to activate the deal'; }
      case LISTING_STATUSES.CANCELLED: { return 'Cancelled'; }
      case LISTING_STATUSES.COMPLETED: { return 'Completed'; }
      default: { return ''; }
    }
  };

  // Calculate the progress of order
  useEffect(() => {
    if (selectedListingData.images === undefined || selectedListingData.images == null) {
      setIsImagesPresent(false);
    }
    else {
      setIsImagesPresent(true);
    }
  }, []);

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

  return (
    <div className="container mt-4 shadow p-3">
      <div className="row mt-3 ml-3 p-2">
        <div className="col">
          <h5 className="mt-2 text-capitalize">{selectedListingData.title}</h5>
        </div>
      </div>
      <div className="row mt-2 ml-3 mr-3 p-2">
        <div />
        <div className="col">
          <figure className="figure">
            { !isImagesPresent && (
            <img src="no-image-available-icon_m.jpg" className="figure-img img-fluid ending-soon-image border" alt="..." />
            )}
            { isImagesPresent && (
              <ListingImagesCarousel listImages={Object.values(selectedListingData.images)} />
            )}
            <figcaption className="figure-caption text-dark font-weight-bolder mt-1">{selectedListingData.title}</figcaption>
          </figure>

          <div className="progress col-6">
            <div id="order-progress" className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{ width: `${progressPercent}%` }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" />
          </div>
          <div className="text-muted order-progress-label">
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
      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="mr-2 pr-2 text-muted">
            <del>
              $
              {Number(selectedListingData.usualPrice)}
            </del>
          </span>
          <span className="font-weight-bolder">
            $
            {Number(selectedListingData.discountedPrice)}
          </span>
        </div>
      </div>

      {(currentListViewDisplayMode !== LISTING_VIEW_MODES.LISTER_LISTING_VIEW) && children}

      {(totalQuantity !== 0) && (
      <div className="row mt-3 ml-3">
        <div className="col">
          Total Price:
          {' '}
          {Number(totalQuantity) * Number(selectedListingData.discountedPrice)}
        </div>
      </div>
      )}

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Quantity available:</span>
          { ' '}
          {selectedListingData.quantity}
        </div>
        <div className="col">
          <span className="font-italic small">MOQ:</span>
          { ' '}
          {selectedListingData.moq}
        </div>
        <div className="col">
          {/* No:of purchases already */}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Status:</span>
          {' '}
          {getListingCurrentStatus()}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">
            Category:
          </span>
          {' '}
          {selectedListingData.category}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Start Date:</span>
          {' '}
          {' '}
          {new Date(selectedListingData.startDate).toDateString()}
        </div>
      </div>
      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">End Date:</span>
          {' '}
          {' '}
          {new Date(selectedListingData.endDate).toDateString()}
        </div>
      </div>
      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Delivery Mode:</span>
          {' '}
          {selectedListingData.deliveryMode}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <span className="font-italic small">Listed By:</span>
          {' '}
          {selectedListingData.listerId}
        </div>
      </div>

      <div className="row mt-3 ml-3">
        <div className="col">
          <h6>
            Details of
            { ' '}
            {selectedListingData.title}
          </h6>
        </div>
        <div className="col-12">
          <p>
            {selectedListingData.description}
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
            {selectedListingData.tnc}
          </p>
        </div>
      </div>
      {(currentListViewDisplayMode === LISTING_VIEW_MODES.LISTER_LISTING_VIEW) && children}
    </div>
  );
}
