import React, { useContext, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GroupBuyContext, loadListings } from '../../store.jsx';
import './viewAllListings.css';
import CategoriesContainer from './CategoriesContainer.jsx';
import ViewAllListingCard from './ViewAllListingCard.jsx';

export default function ViewAllListings() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const [allCategories, setAllCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState(allCategories[0]);
  const [currListingsDisplayed, setCurrListingsDisplayed] = useState([]);
  const [btnArray, setBtnArray] = useState([]);

  const { listings } = store;

  useEffect(() => {
    loadListings(dispatch, setAllCategories, setBtnArray);
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

  const selectCategoryProps = {
    btnArray, setBtnArray, setCurrCategory, setCurrListingsDisplayed,
  };

  return (
    <div className=" container-sm view-all-listings-container">
      <div className="row ml-auto mr-auto">
        <div className="col-8">
          <h3 className="ml-3">All Listings</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CategoriesContainer selectCategoryProps={selectCategoryProps} />
        </div>
      </div>
      <div className="row">
        <div className="col listings-container">
          <InfiniteScroll
            className="infinite-scroll-container"
            dataLength={currListingsDisplayed.length}
            next={fetchMoreData}
            hasMore
          >
            {displayRows()}
          </InfiniteScroll>

        </div>
      </div>
    </div>
  );
}
