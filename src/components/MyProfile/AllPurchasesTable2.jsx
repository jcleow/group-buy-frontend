import React, { useContext, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { GroupBuyContext, getAllPurchasesAssociatedWUser } from '../../store.jsx';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './AllPurchasesTable2.css';
import {
  columns, expandRow, getPaginationOptions, defaultSorted, mapDataIntoTable,
} from './allPurchasesTableData.jsx';

export default function AllPurchasesTable2() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const [allPurchases, setAllPurchases] = useState([]);

  // query the db to find all purchases connected with this user
  useEffect(async () => {
    const AllPurchasesAssociatedWUser = await getAllPurchasesAssociatedWUser();
    console.log(AllPurchasesAssociatedWUser);

    setAllPurchases(AllPurchasesAssociatedWUser);
  }, []);

  return (
    <div className="table-responsive">
      <BootstrapTable
        bootstrap4
        keyField="id" // Tells react-bootstrap-table2 which col is unique; shld be e name of a property tt is unique for each Item in e dataset
        data={mapDataIntoTable(allPurchases)} // populate data into rows
        columns={columns}
        defaultSorted={defaultSorted}
        expandRow={expandRow} // determines what goes inside the expanded secton
        // className="table-responsive"
        width="100%"
        striped
        hover
        condensed
        noDataIndication={<h2>No data to display</h2>}
        // bordered={false}
        caption={<h3>Purchase history</h3>}
        pagination={paginationFactory(getPaginationOptions(allPurchases))}
      />
    </div>
  );
}
