import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { GroupBuyContext, sortListingsByEndDateAction } from '../store.jsx';
import ListCardWithImage from './ListCardWithImage.jsx';

export default function EndingSoonContainer() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { listings } = store;

  useEffect(() => {
    dispatch(sortListingsByEndDateAction());
  }, []);

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto ">
        <div className="col-8">
          <h6>Ending Soon</h6>
        </div>
        <div className="col-2 mr-auto text-right">
          <button type="button" className="btn btn-sm">more</button>
        </div>
      </div>
      <div className="row listings-card-row flex-nowrap">
        {listings.map((singleListing) => (
          <ListCardWithImage singleListing={singleListing} />
        ))}
      </div>
    </div>
  );
}
