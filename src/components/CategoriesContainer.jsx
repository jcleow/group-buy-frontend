import React, { useContext } from 'react';
import { GroupBuyContext } from '../store.jsx';
import './CategoriesContainer.css';

export default function CategoriesContainer() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { categories } = store;

  const handleClickCategory = () => {
    // To do
  };

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto">
        <div className="col">
          <h6>Categories</h6>
        </div>
      </div>
      <div className="row ml-auto mb-1 flex-md-wrap">
        {categories.map((category) => (
          <div className="col mb-1 category pl-auto pr-1">
            <button type="button" className="btn btn-sm btn-block btn-category btn-warning" onClick={handleClickCategory}>{category}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
