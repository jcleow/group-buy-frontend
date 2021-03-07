import React, { useContext, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { GroupBuyContext, getAllPurchasesAssociatedWUser } from '../../store.jsx';
import './allPurchasesTableNew.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './stylesheets/AllPurchasesTable.css';
// import './AllPurchasesTable2.css';
import {
  columns, manageDataInExpandRow, getPaginationOptions, defaultSorted, mapDataIntoTable,
} from './allPurchasesTableData.jsx';

export default function AllPurchasesTable() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const [allPurchases, setAllPurchases] = useState(null);

  // query the db to find all purchases connected with this user
  useEffect(async () => {
    const AllPurchasesAssociatedWUser = await getAllPurchasesAssociatedWUser();
    console.log(AllPurchasesAssociatedWUser);

    setAllPurchases(AllPurchasesAssociatedWUser);
  }, []);
  console.log(allPurchases);
  return (
    <div>
      <h3 className="purchase-history">Purchase History</h3>
      <div className="all-purchases-container">
        {/* conditionally render the table if and only if allPurchases is not null */}
        {allPurchases && (
        <BootstrapTable
          bootstrap4
          keyField="purchaseId" // Tells react-bootstrap-table2 which col is unique; shld be e name of a property tt is unique for each Item in e dataset
          data={mapDataIntoTable(allPurchases)} // populate data into rows
          columns={columns}
          defaultSorted={defaultSorted}
          expandRow={manageDataInExpandRow(allPurchases)} // determines what goes inside the expanded secton
        // className="table-responsive"
          width="100%"
          striped
          loading
          hover
          condensed
          noDataIndication={<h2>No data to display</h2>}
        // bordered={false}
          pagination={paginationFactory(getPaginationOptions(allPurchases))}
        />
        )}
      </div>
    </div>
  );
}
