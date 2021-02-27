import React, { useContext, useState } from 'react';
import { GroupBuyContext } from '../store.jsx';
import LatestListingsListCard from './LatestListingsListCard.jsx';
import './LatestListingsCard.css';

export default function LatestListingsContainer() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { sortedListingsByCreatedDate } = store;

  const [seeMoreButtonName, setSeeMoreButtonName] = useState('more...');
  const [isSeeMore, setIsSeeMore] = useState(true);

  const handleSeeMore = () => {
    setIsSeeMore(!isSeeMore);
    setSeeMoreButtonName((!isSeeMore ? 'more...' : 'less...'));
  };

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto ">
        <div className="col-8">
          <h6>Latest Listings</h6>
        </div>
        <div className="col-2 ml-auto mb-1 mr-1">
          <button type="button" className="btn btn-sm btn-warning font-italic" onClick={handleSeeMore}>{seeMoreButtonName}</button>
        </div>
      </div>
      <div className={`row row-cols-2 row-cols-sm-4 row-cols-lg-5 latest-listings-card-row ${isSeeMore ? 'flex-nowrap' : 'flex-wrap'} `}>
        {sortedListingsByCreatedDate.map((singleListing) => (
          <LatestListingsListCard singleListing={singleListing} />
        ))}
      </div>
    </div>
  );
}
