import React, { useReducer } from "react";
import axios from 'axios';

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {  
  listings : [],
  categories:[],
  currentListingIndex : null
}

// just like the todo app, define each action we want to do on the
// data we defined above
const ADD_LISTING = "ADD_LISTING";
const DELETE_LISTING = "DELETE_LISTING";

//Used to load initial listings and also to reload edited listings
const LOAD_LISTINGS = "LOAD_LISTINGS";
const SELECT_LISTING = "SELECT_LISTING";

// define the matching reducer function
export function groupBuyReducer(state, action) {
  switch (action.type) {
    case ADD_LISTING:
      return {...state, listings:[...state.listings, action.payload.listing]}
    case DELETE_LISTING:
      let newListings = state.filter((_item, i) => action.payload.listingIndex !== i);
      return {...state, listings:newListings}    
    case LOAD_LISTINGS:
      return {...state, listings: action.payload.listings}
    case SELECT_LISTING:
      const currentListingIndex = action.payload.listingIndex;
      return {...state, currentListingIndex}
    default:
      return state;
  }
}

// The following action-generating functions are commonly referred to
// as "action creators". They accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.
export function addListingAction(listing) {
  return {
    type: ADD_LISTING,
    payload: {
      listing
    }
  };
}

export function deleteListingAction(listingIndex) {
  return {
    type: DELETE_LISTING,
    payload: {
      listingIndex
    }
  };
}

export function loadListingsAction(listings) {
  return {
    type: LOAD_LISTINGS,
    payload: {
      listings
    }
  };
}
export function selectListingAction(listingIndex) {
  return {
    type: SELECT_LISTING,
    payload: {
      listingIndex
    }
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

export const GroupBuyContext = React.createContext(null);
const {Provider} = GroupBuyContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function GroupBuyProvider({children}) {
  const [store, dispatch] = useReducer(groupBuyReducer, initialState);
  return (<Provider value={{store, dispatch}}>
      {children}
    </Provider>)
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

const BACKEND_URL = 'http://localhost:3004';

export function loadListings(dispatch){
  axios.get(BACKEND_URL+'/listings').then((result) => {
    dispatch(loadListingsAction(result.data.listings));
  });
}

export function createListing(dispatch, listing){
  return axios.post(BACKEND_URL+'/addlisting', listing).then((result) => {
    dispatch(addListingAction());
    return result.data.listing.id;
  });
}