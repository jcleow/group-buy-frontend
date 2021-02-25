/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import './EndingSoonContainer.css';
import { GroupBuyContext, findPurchaseCountPerListing } from '../store.jsx';

export default function ListCardWithImage({ singleListing }) {
  const [progressPercent, setProgressPercent] = useState(0);
  const [isImagesPresent, setIsImagesPresent] = useState(singleListing.images === undefined
    || singleListing.images == null);
  const { store, dispatch } = useContext(GroupBuyContext);
  const { listings } = store;
  console.log({ isImagesPresent }, 'isImagesPresent');

  // Calculate the progress of order
  useEffect(() => {
    findPurchaseCountPerListing(singleListing.id, setProgressPercent);
  }, []);
  return (
    <div className="col-6 col-md-3 ml-auto">
      <figure className="figure">
        { !isImagesPresent && (
          <img src="black.jpg" className="figure-img img-fluid ending-soon-image" alt="..." />
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
