import React, { useContext, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GroupBuyContext, loadListings } from '../../store.jsx';
import ViewAllListingCard from './ViewAllListingCard.jsx';

// require('react/package.json'); // react is a peer dependency.
// const InfiniteScroll = require('react-infinite-scroll-component');

export default function ViewAllListings() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { listings } = store;

  const [currListingsDisplayed, setCurrListingsDisplayed] = useState([]);
  useEffect(() => {
    loadListings(dispatch);
  }, []);

  useEffect(() => {
    if (currListingsDisplayed.length === 0) {
      setCurrListingsDisplayed(listings.slice(0, 12));
    }
  });

  function rowsOfListingCards() {
    const rowsOfListings = [[]];
    for (let i = 0; i < currListingsDisplayed.length; i += 1) {
      if (i % 4 === 0 && i > 0) {
        rowsOfListings.push([]);
        rowsOfListings[rowsOfListings.length - 1].push(<ViewAllListingCard singleListing={currListingsDisplayed[i]} />);
      }
      else {
        rowsOfListings[rowsOfListings.length - 1].push(<ViewAllListingCard singleListing={currListingsDisplayed[i]} />);
      }
    }
    return rowsOfListings;
  }

  function displayRows() {
    const rowsOfListings = rowsOfListingCards();
    const allRows = rowsOfListings.map((rowOfListing) => (
      <div className="row listings-card-row d-flex justify-content-start">
        {rowOfListing}
      </div>
    ));
    return allRows;
  }

  function fetchMoreData() {
    // Simulate a fake API call with delay upon reloading
    setTimeout(() => {
      setCurrListingsDisplayed(listings.slice(0, currListingsDisplayed.length + 8));
    }, 1500);
  }

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto mr-auto">
        <div className="col-8">
          <h6>All Listings</h6>
        </div>
      </div>
      <InfiniteScroll
        // dataLength={`${currListingsDisplayed.length}`}
        dataLength={currListingsDisplayed.length}
        next={fetchMoreData}
        hasMore
        loader={<h4 className="text-center">Loading...</h4>}
      >
        {displayRows()}
      </InfiniteScroll>
    </div>
  );
}
