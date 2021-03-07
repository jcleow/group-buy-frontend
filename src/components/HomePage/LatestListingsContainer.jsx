import React, { useContext, useState } from 'react';
// import { GroupBuyContext } from '../../store.jsx';
import LatestListingsListCard from './LatestListingsListCard.jsx';
import './LatestListingsCard.css';
import { isListingCancelled } from '../utility/listingHelper.js';

export default function LatestListingsContainer({ latestListings }) {
  // const { store, dispatch } = useContext(GroupBuyContext);
  // const { sortedListingsByCreatedDate } = store;
  // console.log(latestListings, 'latestListings');

  const [seeMoreButtonName, setSeeMoreButtonName] = useState('more...');
  const [isSeeMore, setIsSeeMore] = useState(true);

  const handleSeeMore = () => {
    setIsSeeMore(!isSeeMore);
    setSeeMoreButtonName((!isSeeMore ? 'more...' : 'less...'));
  };

  return (
    <div className="container-sm mt-4">
      <div className="row mb-3 pt-2">
        <div className="col-9">
          <h6>Latest Listings</h6>
        </div>
        <div className="col-2 mb-1 d-flex flex-row-reverse">
          <button type="button" className="btn btn-sm btn-warning font-italic see-more" onClick={handleSeeMore}>{seeMoreButtonName}</button>
        </div>
      </div>
      <div className={`row row-cols-2 row-cols-sm-3 row-cols-lg-4 latest-listings-card-row ${isSeeMore ? 'flex-nowrap' : 'flex-wrap'} `}>
        {latestListings.map((singleListing, index) => (
          (!isListingCancelled(singleListing.listingStatus))
          && (
          <LatestListingsListCard key={`latest-${Number(index)}`} singleListing={singleListing} />
          )))}
      </div>
    </div>
  );
}
