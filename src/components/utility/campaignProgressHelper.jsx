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

// Helper that generates yAxis Tick Values
export const generateYAxisTickValues = (campaignStore) => {
  const individualPurchaseCount = campaignStore.pastSevenDaysCount.map((dayCount) => dayCount.y);
  console.log(individualPurchaseCount, 'individualPurchaseCount');

  const maxVal = Math.max(...individualPurchaseCount, 0);
  const minVal = Math.min(...individualPurchaseCount, 0);
  const purchaseCountRange = maxVal - minVal;
  console.log(purchaseCountRange, 'purchaseCountRange');

  const yAxisInterval = Math.floor(purchaseCountRange / 5);
  const yAxisTickValues = [];
  // To ensure that second highest value is not too close to the top axis label
  if (purchaseCountRange > 0 && yAxisInterval > 0) {
    for (let i = 0; i < purchaseCountRange - yAxisInterval; i += yAxisInterval) {
      console.log(yAxisTickValues, 'yAxisTickValues');
      yAxisTickValues.push(i);
    }
  }
  // To ensure top of the graph always has the largest (label) value
  console.log(yAxisTickValues, 'yAxisTickValues');
  yAxisTickValues.push(maxVal);

  return yAxisTickValues;
};

// Helper that generates and pushes the past 7 days
export const generatePastSevenDays = () => {
  const pastSevenDaysArray = [];
  for (let i = 7; i >= 0; i -= 1) {
    // Start from today's date then progressive go backwards
    const singleDate = new Date();
    singleDate.setDate(singleDate.getDate() - i);

    // Format into DD/MM
    const options = { day: '2-digit', month: '2-digit' };
    const formattedDate = singleDate.toLocaleDateString('en-GB', options);

    // Append into an accumulative array
    pastSevenDaysArray.push(formattedDate);
  }
  return pastSevenDaysArray;
};

// Helper that gets the lowest y-value
export const getLowestYVal = (purchaseRange) => {
  let yLow = null;
  purchaseRange.forEach((day) => {
    if (day.y < yLow || yLow === null) {
      yLow = day.y;
    }
  });

  if (yLow !== null) {
    return yLow;
  }
  return 0;
};
