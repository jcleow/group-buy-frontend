import React, { useContext } from 'react';
import { GroupBuyContext } from '../../store.jsx';
import './CategoriesContainer.css';

export default function CategoriesContainer({ selectCategoryProps }) {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { categories } = store;

  const {
    btnArray, setBtnArray, setEndingSoonListings, setLatestListings,
  } = selectCategoryProps;

  const handleSelectCategory = (e) => {
    let filteredEndingSoonListings = store.listings;
    let filteredLatestListings = store.sortedListingsByCreatedDate;
    if (e.target.value !== 'All') {
      filteredEndingSoonListings = store.listings.filter((listing) => listing.category === e.target.value);
      filteredLatestListings = store.sortedListingsByCreatedDate.filter((listing) => listing.category === e.target.value);
    }
    setEndingSoonListings(filteredEndingSoonListings);
    setLatestListings(filteredLatestListings);
  };

  const handleSelectedBtn = (idx) => {
    const newBtnArray = btnArray.map(() => false);
    newBtnArray[idx] = true;
    setBtnArray([...newBtnArray]);
  };

  return (
    <div className="container-sm mt-4 categoriesContainer shadow">
      <div className="row ml-auto">
        <div className="col">
          <h6>Categories</h6>
        </div>
      </div>
      <div className="row ml-auto mr-auto mb-1 pb-1 flex-md-wrap">
        {categories.map((category, i) => (
          <div key={`category-${Number(i)}`} className="col-3 col-md mb-1 category pl-auto pr-1">
            <button
              type="button"
              className={btnArray[i] ? 'btn btn-sm btn-block btn-category btn-info' : 'btn btn-sm btn-block btn-category btn-warning'}
              value={category}
              onClick={
              (e) => {
                handleSelectCategory(e);
                handleSelectedBtn(i);
              }
            }
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
