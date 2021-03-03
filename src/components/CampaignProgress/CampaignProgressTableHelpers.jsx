import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// For table columns
export const tableColumns = [
  {
    dataField: 'serialNum',
    text: 'S/N',
    editable: false,
  },
  {
    dataField: 'id',
    text: 'UUID',
  },
  {
    dataField: 'username',
    text: 'Username',
    editable: false,
  }, {
    dataField: 'paymentStatus',
    text: 'Payment',
    editable: false,
  }, {
    dataField: 'quantity',
    text: 'Quantity',
    editable: false,
  }, {
    dataField: 'createdAt',
    text: 'Date Participated',
    editable: false,
  }, {
    dataField: 'reputation',
    text: 'Reputation',
    editable: false,
  }, {
    dataField: 'dateDelivered',
    text: 'Date Delivered',
    editable: true,
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
