import React from 'react';
import moment from 'moment';
import PaymentConfirmation from './OrderHistoryComponents/PaymentConfirmation.jsx';

/* ======================================
Manage the column headers and data type for that column
====================================== */
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
},
{
  dataField: 'datePurchased',
  text: 'Date purchased',
  sort: true,
},
{
  dataField: 'item',
  text: 'Item',
  sort: true,
},
{
  dataField: 'paymentDetails',
  text: 'Payment details',
  sort: true,
}];

/* ======================================
 Map data into the rows
====================================== */
// format the data such that react-table-next can process it
const mapDataIntoTable = (allPurchases) => {
  console.log('allPurchases is:');
  console.log(allPurchases);
  // create a global var that holds the data in the table
  const tableData = [];
  allPurchases.forEach((el, index) => {
    tableData.push(
      {
        id: `${el.id}`,
        // datePurchased: el.createdAt,
        datePurchased: moment(el.createdAt).format('DD/MM/YYYY'),
        item: el.listing.title,
        paymentDetails: moment(el.updatedAt).format('DD/MM/YYYY'),
      },
    );
  });
  return tableData;
};

/* ======================================
 Manage default sorting
====================================== */
const defaultSorted = [{
  dataField: 'item',
  order: 'desc',
}];

/* ======================================
Manage the data shown when the row is expanded
====================================== */
const expandRow = {
  renderer: (row) => (
    <div className="container">
      <div className="row">
        <div className="col">
          Order tracking:
          <PaymentConfirmation />
        </div>
      </div>

      {/* NOTES:
        <p>{ `This expanded row belongs to rowKey ${row.id}` }</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p> */}
    </div>
  ),
};

/* ======================================
 Manage pagination options
====================================== */
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    {` Showing ${from} to ${to} of ${size} Results`}
  </span>
);

const getPaginationOptions = (allPurchases) => (
  {
    paginationSize: 5,
    pageStartIndex: 1,
    alwaysShowAllBtns: false, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    // firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    // lastPageText: 'Last',
    // nextPageTitle: 'First page',
    // prePageTitle: 'Pre page',
    // firstPageTitle: 'Next page',
    // lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5,
    }, {
      text: '10', value: 10,
    }, {
      text: 'All', value: allPurchases.length,
    }], // A numeric array is also available. the purpose of above example is custom the text
  }
);
/* ======================================
====================================== */

export {
  columns, expandRow, getPaginationOptions, defaultSorted, mapDataIntoTable,
};
