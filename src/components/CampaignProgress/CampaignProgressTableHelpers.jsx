import React from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// For table columns
export const tableColumns = [
  {
    dataField: 'id',
    text: 'S/N',
  },
  {
    dataField: 'username',
    text: 'Username',
  }, {
    dataField: 'paymentStatus',
    text: 'Payment',
  }, {
    dataField: 'quantity',
    text: 'Quantity',
  }, {
    dataField: 'createdAt',
    text: 'Date Participated',
  }, {
    dataField: 'reputation',
    text: 'Reputation',
  }, {
    dataField: 'dateDelivered',
    text: 'Date Delivered',
  },
];

// For Pagination
export const paginationCustomTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing
    {' '}
    { from }
    {' '}
    to
    {' '}
    { to }
    {' '}
    of
    {' '}
    { size }
    {' '}
    Results
  </span>
);

export const generatePaginationOptions = (indexAllPurchases) => {
  const paginationOptions = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: paginationCustomTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5,
    }, {
      text: '10', value: 10,
    }, {
      text: 'All', value: indexAllPurchases.length,
    }], // A numeric array is also available. the purpose of above example is custom the text
  };
  return paginationOptions;
};
