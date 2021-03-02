import React, { useContext, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { GroupBuyContext, getAllPurchasesAssociatedWUser } from '../../store.jsx';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

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
          id: `${index}`,
          datePurchased: el.createdAt,
          item: el.listing.title,
          paymentDetails: el.paymentReceipt,

        },
      );
    });
  };

  // useEffect(MapDataIntoTable, [allPurchases]);
  MapDataIntoTable();

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

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={tableData}
      columns={columns}
      defaultSorted={defaultSorted}
    />
  );
}
