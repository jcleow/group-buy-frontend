/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import './EndingSoonContainer.css';
import { LinkContainer } from 'react-router-bootstrap';
import { GroupBuyContext, selectListingAction, displayListingDetailsAction } from '../../store.jsx';
import './LatestListingsCard.css';
import { calcDiscountPct } from '../utility/listingHelper.js';

export default function LatestListingListCard({ singleListing }) {
  const [isImagesPresent, setIsImagesPresent] = useState(false);
  const { store, dispatch } = useContext(GroupBuyContext);

  // Calculate the progress of order
  useEffect(() => {
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
    <div className="col mb-4">
      <LinkContainer to={`/listingdetails/${singleListing.id}`} onClick={handleSelectListing}>
        {/* <div className="card h-100"> */}
        <div className="h-100 latest-list-card">
          { !isImagesPresent && (
            <img src="no-image-available-icon_m.jpg" className="latest-list-image rounded card-img-top" alt="..." />
          )}
          { isImagesPresent && (
            <img src={/* singleListing.images?.img1 */ Object.values(singleListing.images)?.[0]} className="latest-list-image rounded card-img-top" alt="..." />
          )}
          {/* <div className="card-body"> */}
          <div className="p-1">
            {/* <h6 className="card-title">{singleListing.title}</h6> */}
            <h6>{singleListing.title}</h6>
            <p className="card-text">
              <del className="text-muted">
                $
                {Number(singleListing.usualPrice)}
              </del>
              <span className="font-weight-bolder ml-2">
                $
                {Number(singleListing.discountedPrice)}
              </span>
              <br />
              <span className="font-italic small">
                {' '}
                {calcDiscountPct(singleListing.discountedPrice, singleListing.usualPrice)}
                % Off
              </span>
              <br />
              <small className="text-muted">
                <em>Listed By:</em>
                {' '}
                {singleListing.lister?.username}
              </small>
              <br />
              <small className="text-muted">
                <em>Posted:</em>
                {' '}
                {moment(singleListing.createdAt).format('DD/MM/YYYY')}
              </small>
            </p>
          </div>
        </div>
      </LinkContainer>
    </div>
  );
}
