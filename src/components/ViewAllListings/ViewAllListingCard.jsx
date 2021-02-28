/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import './ViewAllContainer.css';
import { LinkContainer } from 'react-router-bootstrap';
import {
  GroupBuyContext, findPurchaseCountPerListing, selectListingAction, displayListingDetailsAction,
} from '../../store.jsx';

export default function ViewAllListingCard({ singleListing }) {
  const [progressPercent, setProgressPercent] = useState(0);
  const [isImagesPresent, setIsImagesPresent] = useState(false);
  const { store, dispatch } = useContext(GroupBuyContext);

  // Calculate the progress of order
  useEffect(() => {
    findPurchaseCountPerListing(singleListing.id, setProgressPercent);
    if (singleListing.images === undefined || singleListing.images == null) {
      setIsImagesPresent(false);
    }
    else {
      setIsImagesPresent(true);
    }
  }, []);

  const handleSelectListing = () => {
    dispatch(selectListingAction(singleListing));
    dispatch(displayListingDetailsAction(true));
  };

  return (
    <div className="col-6 col-md-3 listing-min-width">
      <LinkContainer to="/listingdetails" onClick={handleSelectListing}>
        <figure className="figure">
          { !isImagesPresent && (
            <img src="no-image-available-icon_m.jpg" className="figure-img img-fluid ending-soon-image border" alt="..." />
          )}
          { isImagesPresent && (
            <img src={singleListing.images?.img1} className="figure-img img-fluid ending-soon-image" alt="..." />
          )}

          <div id="img-overlay">
            <span id="time-left-number">{moment(new Date(singleListing.endDate)).fromNow(true)}</span>
            {' '}
            left
          </div>
          <figcaption className="figure-caption text-dark font-weight-bolder">{singleListing.title}</figcaption>
        </figure>
      </LinkContainer>
      <div className="progress">
        <div id="order-progress" className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{ width: `${progressPercent}%` }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" />
      </div>
      <div className="text-muted order-progress-label">
        Ordered so far -
        {' '}
        { ' '}
        {progressPercent}
        %
      </div>
    </div>
  );
}
