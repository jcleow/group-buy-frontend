import React, { useContext, useState, useEffect } from 'react';
import { GroupBuyContext, loadListings } from '../../store.jsx';
import ViewAllListingCard from './ViewAllListingCard.jsx';

export default function ViewAllListings() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { listings } = store;
  console.log(listings, 'listings');

  useEffect(() => {
    loadListings(dispatch);
  }, []);

  function rowsOfListingCards() {
    const rowsOfListings = [[]];
    for (let i = 0; i < store.listings.length; i += 1) {
      if (i % 4 === 0 && i > 0) {
        rowsOfListings.push([]);
        rowsOfListings[rowsOfListings.length - 1].push(<ViewAllListingCard singleListing={store.listings[i]} />);
      }
      else {
        rowsOfListings[rowsOfListings.length - 1].push(<ViewAllListingCard singleListing={store.listings[i]} />);
      }
    }
    return rowsOfListings;
  }

  function displayRows() {
    const rowsOfListings = rowsOfListingCards();
    console.log(rowsOfListings, 'rowsOfListings');
    const allRows = rowsOfListings.map((rowOfListing) => (
      <div className="row listings-card-row d-flex justify-content-start">
        {rowOfListing}
      </div>
    ));
    return allRows;
  }

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto mr-auto">
        <div className="col-8">
          <h6>All Listings</h6>
        </div>
      </div>
      {displayRows()}
    </div>
  );
}
