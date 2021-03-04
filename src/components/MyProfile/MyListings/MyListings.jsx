import React, { useEffect, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { loadMyListings, MyListingsContext, MyListingsProvider } from '../../../stores/myListingsStore.jsx';

export default function AllMyListings() {
  const generateIndexedListings = (store) => {
    const indexListings = store.myListings
      .map((listing, i) => ({ serialNum: i + 1, ...listing }));
    return indexListings;
  };

  const myListingsColumns = [
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
      dataField: 'title',
      text: 'Campaign',
      editable: false,
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

  const { myListingsStore, dispatchMyListings } = useContext(MyListingsContext);

  useEffect(() => {
    loadMyListings(dispatchMyListings);
  }, []);
  console.log(myListingsStore.myListings, 'myListings');

  return (
    <MyListingsProvider>
      <div className="container">
        <BootstrapTable
          keyField="id"
          data={generateIndexedListings(myListingsStore)}
          columns={myListingsColumns}
          pagination={paginationFactory()}
        />
      </div>
    </MyListingsProvider>
  );
}
