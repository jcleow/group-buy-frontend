/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import './EndingSoonContainer.css';
import { LinkContainer } from 'react-router-bootstrap';
import {
  GroupBuyContext, findPurchaseCountPerListing, selectListingAction, displayListingDetailsAction,
} from '../../store.jsx';

export default function EndingSoonListCard({ singleListing }) {
  const [progressPercent, setProgressPercent] = useState(0);
  const { store, dispatch } = useContext(GroupBuyContext);

  // // Calculate the progress of order
  // useEffect(() => {
  //   // findPurchaseCountPerListing(singleListing.id, setProgressPercent);
  // }, []);

  const handleSelectListing = () => {
    dispatch(selectListingAction(singleListing));
    dispatch(displayListingDetailsAction(true));
  };

  return (
    // <div className="col-6 col-md-3 ml-auto">
    <div className="col-6 col-md-3">
      <LinkContainer to={`/listingdetails/${singleListing.id}`} onClick={handleSelectListing}>
        <figure className="figure">
          { (singleListing.images === undefined || singleListing.images == null) && (
            <img src="no-image-available-icon_m.jpg" className="figure-img img-fluid ending-soon-image border" alt="..." />
          )}
          { (singleListing.images !== undefined && singleListing.images !== null) && (
            <img src={/* singleListing.images?.img1 */ Object.values(singleListing.images)?.[0]} className="figure-img img-fluid ending-soon-image" alt="..." />
          )}

          <div id="img-overlay">
            <span id="time-left-number">{moment(new Date(singleListing.endDate)).fromNow(true)}</span>
            {' '}
            left
          </div>
          <figcaption className="figure-caption text-dark font-weight-bolder">{singleListing.title}</figcaption>
        </figure>
      </LinkContainer>
      {findPurchaseCountPerListing(singleListing.id, setProgressPercent)}
      <div className="progress">
        <div id="order-progress" className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{ width: `${progressPercent}%` }} aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100" />
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
