/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';
import { GroupBuyContext, loadListings, setTotalQuantityOrdered as setTotalQuantityOrderedAction } from '../store.jsx';
import CategoriesContainer from './CategoriesContainer.jsx';
import EndingSoonContainer from './EndingSoonContainer.jsx';
import LatestListingsContainer from './LatestListingsContainer.jsx';

export default function HomePage() {
  const { store, dispatch } = useContext(GroupBuyContext);

  const [getDetailedListView, setDetailedListView, deleteDetailedListView] = useLocalStorage('detailedListView');
  const [getListViewDisplayMode, setListViewDisplayMode, deleteListViewDisplayMode] = useLocalStorage('ListViewDisplayMode');
  const [getTotalQuantityOrdered, setTotalQuantityOrdered, deleteTotalQuantityOrdered] = useLocalStorage('totalQuantityOrdered');

  useEffect(() => {
    loadListings(dispatch);
    dispatch(setTotalQuantityOrderedAction(0));
    deleteDetailedListView();
    deleteListViewDisplayMode();
    deleteTotalQuantityOrdered();
  }, []);

  return (
    <div>
      <CategoriesContainer />
      <EndingSoonContainer />
      <LatestListingsContainer />
    </div>
  );
}
