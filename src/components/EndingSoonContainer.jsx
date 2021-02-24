/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { GroupBuyContext, sortListingsByEndDateAction } from '../store.jsx';
import './EndingSoonContainer.css';

export default function EndingSoonContainer() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { listings } = store;

  useEffect(() => {
    dispatch(sortListingsByEndDateAction());
  }, []);

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto ">
        <div className="col">
          <h6>Ending Soon</h6>
        </div>
        <div className="col ml-auto text-right">
          <button type="button" className="btn btn-sm ">more</button>
        </div>
      </div>
      <div className="row listings-card-row flex-nowrap">
        {listings.map((singleListing) => (
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
              {/* <div id="order-progress" className="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" />
              <label htmlFor="order-progress">Ordered so far</label> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
