/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import {
  GroupBuyContext, setDisplayListingMode, LISTING_VIEW_MODES, selectListingAction,
} from '../../store.jsx';
import DetailedListingView from './DetailedListingView.jsx';
import QuantityPicker from './QuantityPicker.jsx';

export default function ViewListingPerUser() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const {
    currentListViewDisplayMode, loggedInUserId, selectedListingData,
  } = store;
  const [getDetailedListView] = useLocalStorage('detailedListView');
  const [getListViewDisplayMode] = useLocalStorage('ListViewDisplayMode');

  /**
   * Function to write the lisitings data into storage or to read it from storage
   */
  const handleLocalStorage = () => {
    // Check whether the data received in the component is empty or not
    if (Object.keys(selectedListingData).length === 0) {
      // Empty ==> Page might have refreshed and data from the store is not avaialable.
      // Restore it from local storage
      if (getDetailedListView) {
        dispatch(selectListingAction(getDetailedListView));
        dispatch(setDisplayListingMode(getListViewDisplayMode));
      }
    }
    // If the data is received in the component, write it to the local storage
    else {
      writeStorage('detailedListView', { ...selectedListingData });
    }
  };

  // Set the specified mode
  useEffect(() => {
    handleLocalStorage();
    console.log(loggedInUserId, 'loggedInUserId');

    if (loggedInUserId === null) {
      // If no user is logged in just display the details of the item
      dispatch(setDisplayListingMode(LISTING_VIEW_MODES.DEFAULT_LISTING_VIEW));
    }
    else if (loggedInUserId === selectedListingData.listerId)
    {
      // If the logged in user id is equal to the lister id,
    // the display mode is set as Lister's View
      dispatch(setDisplayListingMode(LISTING_VIEW_MODES.LISTER_LISTING_VIEW));
    }
    else
    {
      dispatch(setDisplayListingMode(LISTING_VIEW_MODES.BUYER_LISTING_VIEW));
    }
  }, []);

  const handleClickNextButton = () => {

  };

  const handleEdit = () => {
    console.log('Edit');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  const handleDisplayePerMode = () => {
    const rowClasses = 'row mt-3 ml-3';
    const colClasses = 'col';
    switch (currentListViewDisplayMode)
    {
      case LISTING_VIEW_MODES.BUYER_LISTING_VIEW:
      {
        return (
          <div className={rowClasses}>
            <QuantityPicker />
            <div className={colClasses}>
              <LinkContainer to="/testPayment" onClick={handleClickNextButton}>
                <span className="btn btn-sm btn-warning">Buy</span>
              </LinkContainer>
            </div>
          </div>
        );
      }
      case LISTING_VIEW_MODES.LISTER_LISTING_VIEW:
      {
        return (
          <div className={rowClasses}>
            <div className={colClasses}>
              <button type="button" className="btn btn-sm btn-warning" onClick={handleEdit}>Edit</button>
            </div>
            <div className={colClasses}>
              <button type="button" className="btn btn-sm btn-warning" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        );
      }
      case LISTING_VIEW_MODES.DEFAULT_LISTING_VIEW:
      {
        return (<div />);
      }
      default:
      {
        return (<div />);
      }
    }
  };

  return (
    <div className="container mb-5">
      <DetailedListingView>
        {handleDisplayePerMode()}
      </DetailedListingView>
    </div>
  );
}
