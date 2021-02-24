import React, { useContext, useEffect } from 'react';
import { GroupBuyContext, loadListings } from '../store.jsx';
import CategoriesDisplay from './CategoriesDisplay.jsx';
import CreateListingForm from './CreateListing/CreateListingForm.jsx';

export default function HomePage() {
  const { store, dispatch } = useContext(GroupBuyContext);

  useEffect(() => {
    loadListings(dispatch);
  }, []);

  return (
    <div>
      <CategoriesDisplay />
    </div>
  );
}
