import React, { useEffect, useContext } from 'react';
import './myListings.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { loadMyListings, generateListingsStoreActions } from '../../stores/myListingsStore.jsx';
import { generateIndexedListings, myListingsColumns } from '../utility/myListingsHelper.jsx';

export default function AllMyListings() {
  const { myListingsStore, dispatchMyListings } = generateListingsStoreActions();
  useEffect(() => {
    loadMyListings(dispatchMyListings);
  }, []);
  console.log(myListingsStore.myListings, 'myListings');

  return (
    <div className="my-listings-page">
      <h3>My Listings</h3>
      <div className="my-listings-container">
        <BootstrapTable
          keyField="id"
          data={generateIndexedListings(myListingsStore)}
          columns={myListingsColumns}
          hover
          bordered={false}
          pagination={paginationFactory()}
        />
      </div>
    </div>
  );
}
