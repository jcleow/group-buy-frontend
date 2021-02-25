import React, { useReducer } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3004';
// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store

export const initialFormState = {
  title: '',
  description: '',
  quantity: null,
  moq: null,
  allowOversubscription: false,
  usualPrice: null,
  discountedPrice: null,
  startDate: null,
  endDate: null,
  deliveryDate: null,
  deliveryMode: null,
  tnc: null,
  category: 'Select Category',
  lister_id: null,
};

// just like the todo app, define each action we want to do on the
// data we defined above

// Used to load initial listings and also to reload edited listings

// define the matching reducer function
export function createListingReducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Provider Code
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the provider HOC

export const CreateListingContext = React.createContext(null);
const { Provider } = CreateListingContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function CreateListingProvider({ children }) {
  const [formStore, dispatchListingForm] = useReducer(createListingReducer, initialFormState);
  const handleOnChange = (e) => {
    dispatchListingForm({ field: e.target.name, value: e.target.value });
    console.log(formStore, 'formStore');
  };

  return (
    <Provider value={{
      formStore, dispatchListingForm, handleOnChange,
    }}
    >
      {children}
    </Provider>
  );
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Requests
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the
// code that makes requests to the backend
//
// these functions must be passed the dispatch from the current context

// export function loadListings(dispatch) {
//   axios.get(`${BACKEND_URL}/listings`).then((result) => {
//     dispatch(loadListingsAction(result.data.listings));
//     dispatch(loadCategoriesAction(result.data.categories));
//   });
// }

// export function createListing(dispatch, listing) {
//   return axios.post(`${BACKEND_URL}/addlisting`, listing).then((result) => {
//     dispatch(addListingAction());
//     return result.data.listing.id;
//   });
// }

export function loadCategories(setAllCategories) {
  axios.get(`${BACKEND_URL}/listings`).then((result) => {
    setAllCategories(result.data.categories);
  });
}
