import React, { useContext, useState } from 'react';
import { GroupBuyContext } from '../../store.jsx';
import { LISTING_STATUSES, isListingCancelled } from '../utility/listingHelper.js';
import EndingSoonListCard from './EndingSoonListCard.jsx';

export default function EndingSoonContainer({ endingSoonListings }) {
  const { store, dispatch } = useContext(GroupBuyContext);
  // const { listings } = store;

  const [seeMoreButtonName, setSeeMoreButtonName] = useState('more...');
  const [isSeeMore, setIsSeeMore] = useState(true);

  const handleSeeMore = () => {
    setIsSeeMore(!isSeeMore);
    setSeeMoreButtonName((!isSeeMore ? 'more...' : 'less...'));
  };

  // Check whether a listing end date is past current date.
  // If so, don't display it in the ending soon
  const isListingExpired = (listing) => {
    const todatDate = new Date();
    const endDate = new Date(listing.endDate);
    return ((endDate - todatDate) < 0);
  };

  return (
    <div className="container-sm mt-4 endingSoonContainer">
      <div className="row pt-2 mb-3">
        <div className="col-9">
          <h6>Ending Soon</h6>
        </div>
        <div className="col-2 mb-1 d-flex flex-row-reverse">
          <button type="button" className="see-more btn btn-sm font-italic" onClick={handleSeeMore}>{seeMoreButtonName}</button>
        </div>
      </div>
      <div className={`row row-cols-2 row-cols-sm-4 row-cols-lg-5 listings-card-row ${isSeeMore ? 'flex-nowrap' : 'flex-wrap'} `}>
        {endingSoonListings.map((singleListing, index) => (
          (!isListingExpired(singleListing) && (!isListingCancelled(singleListing.listingStatus))
          && (
          <EndingSoonListCard
            key={`endsoon-${Number(index)}`}
            singleListing={singleListing}
          />
          ))
        ))}
      </div>
    </div>
  );
}
