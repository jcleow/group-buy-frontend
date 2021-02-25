import React, { useContext, useEffect } from 'react';
import { GroupBuyContext, loadListings } from '../store.jsx';
import CategoriesContainer from './CategoriesContainer.jsx';
import EndingSoonContainer from './EndingSoonContainer.jsx';

export default function HomePage() {
  const { store, dispatch } = useContext(GroupBuyContext);

  useEffect(() => {
    loadListings(dispatch);
  }, []);

  return (
    <div>
      <CategoriesContainer />
      <EndingSoonContainer />
    </div>
  );
}
