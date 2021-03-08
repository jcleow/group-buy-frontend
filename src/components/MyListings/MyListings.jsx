import React, { useEffect, useContext } from 'react';
import './myListings.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { loadMyListings, generateListingsStoreActions } from '../../stores/myListingsStore.jsx';
import { generateIndexedListings, getMyListingColumns } from '../utility/myListingsHelper.jsx';
import {
  GroupBuyContext, selectListingAction, selectListing,
} from '../../store.jsx';

export default function AllMyListings() {
  const { groupBuyStore, dispatch } = useContext(GroupBuyContext);
  const { myListingsStore, dispatchMyListings } = generateListingsStoreActions();
  useEffect(() => {
    loadMyListings(dispatchMyListings);
  }, []);

  const handleListItemClick = (event, listingData) => {
  // console.log(event.target); // target is the anchor
    console.log('handleListItemClick', listingData);
    dispatch(selectListingAction(listingData));
  };

  return (
    <div className="my-listings-page">
      <h3>My Listings</h3>
      <div className="my-listings-container">
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={generateIndexedListings(myListingsStore)}
          columns={getMyListingColumns(handleListItemClick)}
          hover
          bordered={false}
          pagination={paginationFactory()}
        />
      </div>
    </div>
  );
}
