import React, { useContext } from 'react';
import { GroupBuyContext } from '../store.jsx';
import './CategoriesDisplay.css';

export default function CategoriesDisplay() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { categories } = store;

  const handleClickCategory = () => {
    // To do
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <h5>Categories</h5>
      </div>
      <div className="row">
        {categories.map((category) => (
          <div className="col category justify-content-start">
            <button type="button" className="btn btn-sm btn-category btn-warning" onClick={handleClickCategory}>{category}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
