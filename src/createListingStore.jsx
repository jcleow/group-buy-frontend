import React, { useReducer, useEffect } from 'react';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import axios from 'axios';

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 * Modes of the Create Listing Form
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

const ABOUT_ITEM = 'ABOUT_ITEM';
const CAMPAIGN_DATES = 'CAMPAIGN_DATES';
const QTY_AND_PRICE = 'QTY_AND_PRICE';
const TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS';
const SUBMITTED = 'SUBMITTED';
const FORM_STEP = 'FORM_STEP';

export const formModes = {
  ABOUT_ITEM, CAMPAIGN_DATES, QTY_AND_PRICE, TERMS_AND_CONDITIONS, SUBMITTED, FORM_STEP,
};

// Name of the createListingForm
export const CREATE_LISTING_FORM = 'create_listing_form';

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
  images: [],
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
  const [formLocalStorage] = useLocalStorage(CREATE_LISTING_FORM);
  if (!formLocalStorage) {
    writeStorage(CREATE_LISTING_FORM, {});
  }

  const handleOnChange = (e) => {
    dispatchListingForm({ field: e.target.name, value: e.target.value });
    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   Object.entries(initialFormState).forEach([key,value] => {
  //     const storageValue = useStorage(`${key}`)
  //   })

  // });

  return (
    <Provider value={{
      formStore, dispatchListingForm, handleOnChange, formLocalStorage,
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

export function loadCategories(setAllCategories) {
  axios.get(`${BACKEND_URL}/listings`).then((result) => {
    setAllCategories(result.data.categories);
  });
}
