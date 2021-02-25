/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import './EndingSoonContainer.css';
import { GroupBuyContext } from '../store.jsx';
import ListingImagesCarousel from './ListingImagesCarousel.jsx';
import './LatestListingsCard.css';

export default function LatestListingListCard({ singleListing }) {
  const [progressPercent, setProgressPercent] = useState(0);
  console.log('singleListing.images', singleListing.images);
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
  return (
    <div className="row mb-1">
      <div className="col-4">
        { !isImagesPresent && (
        <img src="black.jpg" className="latest-list-image rounded" alt="..." />
        )}
        { isImagesPresent && (
        <img src={singleListing.images?.img1} className="latest-list-image rounded" alt="..." />
        )}
      </div>
      <div className="col-8">
        <h6>{singleListing.title}</h6>
      </div>
    </div>
  );
}
