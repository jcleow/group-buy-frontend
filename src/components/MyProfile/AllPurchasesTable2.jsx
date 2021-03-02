import React, { useContext, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import { GroupBuyContext, getAllPurchasesAssociatedWUser } from '../../store.jsx';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './AllPurchasesTable2.css';

export default function AllPurchasesTable2() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const [allPurchases, setAllPurchases] = useState([]);

  // query the db to find all purchases connected with this user
  useEffect(async () => {
    const AllPurchasesAssociatedWUser = await getAllPurchasesAssociatedWUser();
    console.log(AllPurchasesAssociatedWUser);

    setAllPurchases(AllPurchasesAssociatedWUser);
  }, []);

  // create a global var that holds the data in the table
  const tableData = [];
  // format the data such that react-table-next can process it
  const MapDataIntoTable = () => {
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
  };
  MapDataIntoTable();

  const PaymentConfirmation = () => (
    <div className="row">
      <div className="col-2">
        [03/03/2020]:
      </div>
      <div className="col-3">
        Payment confirmed
      </div>
    </div>
  );

  const expandRow = {
    renderer: (row) => (
      <div className="container">
        <div className="row">
          <div className="col">
            Order tracking:
            <PaymentConfirmation />
          </div>
        </div>

        {/*
        <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p> */}
      </div>
    ),
  };

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

  const defaultSorted = [{
    dataField: 'item',
    order: 'desc',
  }];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      {` Showing ${from} to ${to} of ${size} Results`}
    </span>
  );

  const paginationOptions = {
    paginationSize: 4,
    pageStartIndex: 0,
    alwaysShowAllBtns: false, // Always show next and previous button
    withFirstAndLast: true, // Hide the going to First and Last page button
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
  };

  return (
    <div className="table-responsive">
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={tableData}
        columns={columns}
        defaultSorted={defaultSorted}
        expandRow={expandRow}
        // className="table-responsive"
        width="100%"
        striped
        hover
        condensed
        noDataIndication={<h2>No data to display</h2>}
        // bordered={false}
        caption={<h3>Purchase history</h3>}
        pagination={paginationFactory(paginationOptions)}
      />
    </div>
  );
}
