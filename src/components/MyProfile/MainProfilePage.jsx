import React, { useEffect, useContext } from 'react';
import MyListings from './MyListings/MyListings.jsx';
import AllMyPurchases from './AllMyPurchases.jsx';
import AllPurchasesTable2 from './AllPurchasesTable2.jsx';
import { MyListingsProvider, MyListingsContext, loadMyListings } from '../../stores/myListingsStore.jsx';

export default function MainProfilePage() {
  return (
    <>
      <MyListingsProvider>
        <MyListings />
      </MyListingsProvider>
      <AllPurchasesTable2 />
    </>
  );
}
