import React from 'react';
import moment from 'moment';
import PurchaseDateTracker from './OrderHistoryComponents/PurchaseDateTracker.jsx';
import ReceiptApprovalDateTracker from './OrderHistoryComponents/ReceiptApprovalDateTracker.jsx';
import MoqReachedDateTracker from './OrderHistoryComponents/MoqReachedDateTracker.jsx';

/* ======================================
Manage the column headers and data type for that column
====================================== */
const columns = [{
  dataField: 'purchaseId',
  text: 'Purchase ID',
  sort: true,
},
{
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
},
{
  dataField: 'allPurchases',
  text: 'allPurchases',
  sort: true,
  hidden: true,
},

];

/* ======================================
 Map data into the rows
====================================== */
// format the data such that react-table-next can process it
const mapDataIntoTable = (allPurchases) => {
  // create a global var that holds the data in the table
  const tableData = [];
  allPurchases.forEach((el, index) => {
    tableData.push(
      {
        purchaseId: el.id,
        id: el.listingId,
        // datePurchased: el.createdAt,
        datePurchased: moment(el.createdAt).format('DD/MM/YYYY'),
        item: el.listing.title,
        paymentDetails: moment(el.updatedAt).format('DD/MM/YYYY'),
        allPurchases: JSON.stringify(el),
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
const manageDataInExpandRow = () => {
  const expandRow = {
    renderer: (row) => (
      <div className="container-fluid responsive">
        <div className="row">
          <div className="col">
            <PurchaseDateTracker allPurchases={row.allPurchases} />
          </div>
        </div>
        <ReceiptApprovalDateTracker allPurchases={row.allPurchases} />
        <MoqReachedDateTracker allPurchases={row.allPurchases} />
        {/* conditionally render purchase date if it exists in order history */}
        {/* {JSON.parse(row.orderTrackerDetails).purchaseDate && (`Purchased: ${moment(JSON.parse(row.orderTrackerDetails).purchaseDate).format('DD/MM/YYYY')}`)} */}

        {/* {`Purchased: ${moment(JSON.parse(row.orderTrackerDetails).purchaseDate).format('DD/MM/YYYY')}`} */}

        {/* conditionally render receipt approval date if it exists in order history */}
        {/* {JSON.parse(row.orderTrackerDetails).purchaseDate && (`Receipt approval: ${moment(JSON.parse(row.orderTrackerDetails).dateReceiptApproved).format('DD/MM/YYYY')}`)} */}

        {/* {`Receipt approval: ${moment(JSON.parse(row.orderTrackerDetails).dateReceiptApproved).format('DD/MM/YYYY')}`} */}

        {/* conditionally render MOQ date if it exists in order history */}
        {/* {JSON.parse(row.orderTrackerDetails).purchaseDate && (`MOQ reached on: ${moment(JSON.parse(row.orderTrackerDetails).dateMoqReached).format('DD/MM/YYYY')}`)} */}
        {/* {`MOQ reached on: ${moment(JSON.parse(row.orderTrackerDetails).dateMoqReached).format('DD/MM/YYYY')}`} */}

        {/* NOTES:
        <p>{ `This expanded row belongs to rowKey ${row.id}` }</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p> */}
      </div>
    ),
  };
  return expandRow;
};
/* ======================================
 Manage pagination options
====================================== */
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    {` Showing ${from} to ${to} of ${size} Results`}
  </span>
);

const getPaginationOptions = (allPurchases) => ({
  paginationSize: 5,
  pageStartIndex: 1,
  alwaysShowAllBtns: false, // Always show next and previous button
  withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  // firstPageText: 'First',
  // prePageText: 'Back',
  // nextPageText: 'Next',
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
});
/* ======================================
====================================== */

export {
  columns, manageDataInExpandRow, getPaginationOptions, defaultSorted, mapDataIntoTable,
};
