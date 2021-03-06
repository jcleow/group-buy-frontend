import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export const generateLinkToListing = (cell) => (<LinkContainer>{cell?.title}</LinkContainer>);

export const getMyListingColumns = (handleListItemClick) => {
  const myListingsColumns = [
    {
      dataField: 'serialNum',
      text: 'S/N',
      editable: false,
    },
    {
      dataField: 'title',
      text: 'Campaign',
      editable: false,
      formatter: (cellContent, row) => (
        <Link to={`/listingdetails/${row.id}`} onClick={(event) => { handleListItemClick(event, row); }}>
          {row.title}
        </Link>
      ),
    }, {
      dataField: 'moq',
      text: 'Min Order Qty',
      editable: false,
    },
    {
      dataField: 'quantity',
      text: 'Quantity',
      editable: false,
    }, {
      dataField: 'quantityRemaining',
      text: 'Quantity Left',
      editable: false,
    }, {
      dataField: 'startDate',
      text: 'Start Date',
      editable: false,
    }, {
      dataField: 'endDate',
      text: 'End Date',
      editable: false,
    }, {
      dataField: 'listingStatus',
      text: 'Status',
    },
  ];

  return myListingsColumns;
};

export const generateIndexedListings = (store) => {
  const indexListings = store.myListings
    .map((listing, i) => ({ serialNum: i + 1, ...listing }));
  return indexListings;
};
