import React, { useContext } from 'react';
import { GroupBuyContext } from '../../store.jsx';
import './CategoriesContainer.css';

export default function CategoriesContainer({ selectCategoryProps }) {
  const {
    btnArray, setBtnArray, setCurrListingsDisplayed, setCurrCategory,
  } = selectCategoryProps;
  const { store, dispatch } = useContext(GroupBuyContext);
  const { categories } = store;

  // Track which button is currently selected
  // const [btnArray, setBtnArray] = useState([]);

  const handleSelectCategory = (e) => {
    setCurrCategory(e.target.value);
    const filteredListings = store.listings.filter((listing) => listing.category === e.target.value);
    setCurrListingsDisplayed(filteredListings);
  };

  const handleSelectedBtn = (idx) => {
    const newBtnArray = btnArray.map(() => false);
    newBtnArray[idx] = true;
    setBtnArray([...newBtnArray]);
  };

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto">
        <div className="col">
          <h6>Categories</h6>
        </div>
      </div>
      <div className="row ml-auto mb-1 flex-md-wrap">
        {categories.map((category, i) => (
          <div className="col mb-1 category pl-auto pr-1">
            <button
              type="button"
              className={btnArray[i] ? 'btn btn-sm btn-block btn-category btn-info' : 'btn btn-sm btn-block btn-category btn-warning'}
              value={category}
              onClick={(e) => {
                handleSelectCategory(e);
                handleSelectedBtn(i);
              }}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
