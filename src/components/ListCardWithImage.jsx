/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import moment from 'moment';
import './EndingSoonContainer.css';

export default function ListCardWithImage({ singleListing }) {
  const [progressPercent, setProgressPercent] = useState(0);

  // Calculate the progress of order

  return (
    <div className="col-6 col-md-3 ml-auto">
      <figure className="figure">
        <img src={singleListing.images.img1} className="figure-img img-fluid ending-soon-image" alt="..." />
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
      <div className="text-muted order-progress-label">Ordered so far</div>
    </div>
  );
}
