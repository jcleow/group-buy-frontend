/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import './EndingSoonContainer.css';
import { LinkContainer } from 'react-router-bootstrap';
import { GroupBuyContext, selectListingAction, displayListingDetailsAction } from '../../store.jsx';
import './LatestListingsCard.css';

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
        <div className="card h-100">
          { !isImagesPresent && (
          <img src="no-image-available-icon_m.jpg" className="latest-list-image rounded card-img-top" alt="..." />
          )}
          { isImagesPresent && (
          <img src={/* singleListing.images?.img1 */ Object.values(singleListing.images)?.[0]} className="latest-list-image rounded card-img-top" alt="..." />
          )}
          <div className="card-body">
            <h6 className="card-title">{singleListing.title}</h6>
            <p className="card-text overflow-hidden">
              <small className="text-muted">Discount Price: </small>
              {singleListing.discountedPrice}
              <br />
              <small className="text-muted">Usual Price: </small>
              {singleListing.usualPrice}
              <br />
              <span className="text-muted text-truncate ">{singleListing.description}</span>
              <br />
              <small className="text-muted">
                Posted
                {' '}
                {moment(singleListing.createdAt).fromNow()}
              </small>
            </p>
          </div>
        </div>
      </LinkContainer>
    </div>
  );
}
