import React, { useContext, useState } from 'react';
import { GroupBuyContext } from '../../store.jsx';
import EndingSoonListCard from './EndingSoonListCard.jsx';

export default function EndingSoonContainer() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { listings } = store;

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
    <div className="container-sm mt-4">
      <div className="row ml-auto mr-auto">
        <div className="col-8">
          <h6>Ending Soon</h6>
        </div>
        <div className="col-2 ml-auto mb-1 mr-1">
          <button type="button" className="btn btn-sm btn-warning font-italic" onClick={handleSeeMore}>{seeMoreButtonName}</button>
        </div>
      </div>
      <div className={`row listings-card-row ${isSeeMore ? 'flex-nowrap' : 'flex-wrap'} `}>
        {listings.map((singleListing) => (
          (!isListingExpired(singleListing)
          && <EndingSoonListCard singleListing={singleListing} />)
        ))}
      </div>
    </div>
  );
}
