import React, { useReducer } from 'react';
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

// Name of the createListingForm
export const CREATE_LISTING_FORM = 'create_listing_form';

const BACKEND_URL = 'http://localhost:3004';
// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store

export const initialGraphState = {
  purchases: [],
};

// define the matching reducer function
export function createActivityGraphReducer(state, { field, value }) {
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
  const [activityGraphStore, dispatchActivityGraph] = useReducer(
    createActivityGraphReducer, initialGraphState,
  );

  return (
    <Provider value={{
      activityGraphStore, dispatchActivityGraph,
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

export function getAllPurchases(listingId) {
  axios.get(`${BACKEND_URL}/listings/${listingId}/allPurchases`).then((result) => {
    console.log(result);
  });
}
