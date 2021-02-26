import React, { useReducer } from 'react';
import axios from 'axios';

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {
  listings: [],
  categories: [],
  sortedListingsByCreatedDate: [],
  displayListingDetails: false,
  selectedListingData: {},
  loggedInUsername: null,
  loggedInUserId: null,
};

// just like the todo app, define each action we want to do on the
// data we defined above
const ADD_LISTING = 'ADD_LISTING';
const DELETE_LISTING = 'DELETE_LISTING';

// Used to load initial listings and also to reload edited listings
const LOAD_LISTINGS = 'LOAD_LISTINGS';
const SELECT_LISTING = 'SELECT_LISTING';
const SORT_LISTINGS_BY_END_DATE = 'SORT_LISTINGS_BY_END_DATE';
const SORT_LISTINGS_BY_CREATED_DATE = 'SORT_LISTINGS_BY_CREATED_DATE';

// Used to indicate whether the detail view of a listing should be displayed or not
const DISPLAY_LISTING_DETAILS = 'DISPLAY_LISTING_DETAILS';

// Used to load the intial category list. Returned as part of load listings
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

// Used for tracking currUsername and currUserId
const SET_USERNAME = 'SET_USERNAME';
const SET_USERID = 'SET_USERID';

// define the matching reducer function
export function groupBuyReducer(state, action) {
  let newListings;
  let currentListingIndex;

  switch (action.type) {
    case ADD_LISTING:
      return { ...state, listings: [...state.listings, action.payload.listing] };
    case DELETE_LISTING:
      newListings = state.filter((_item, i) => action.payload.listingIndex !== i);
      return { ...state, listings: newListings };
    case LOAD_LISTINGS:
      return { ...state, listings: action.payload.listings };
    case SORT_LISTINGS_BY_END_DATE: {
      //  * Function to sort the listings based on ending date of the listing
      // Before sorting make a copy of the listings by splicing
      // should not mutate the original state in the reducer
      const sortedListings = state.listings.slice().sort((firstListing, secondListing) => {
        const firstListEndingDate = new Date(firstListing.endDate);
        const secondListEndingDate = new Date(secondListing.endDate);
        // if first less than second, return -1
        // if first greater than second, return 1
        // if first is equal to second, return 0
        return (firstListEndingDate - secondListEndingDate);
      });
      return { ...state, listings: [...sortedListings] };
    }
    case SORT_LISTINGS_BY_CREATED_DATE: {
      const sortedListings = state.listings.slice().sort((firstListing, secondListing) => {
        const firstListCreatedDate = new Date(firstListing.createdDate);
        const secondListCreatedDate = new Date(secondListing.createdDate);
        // if first less than second, return -1
        // if first greater than second, return 1
        // if first is equal to second, return 0
        return (firstListCreatedDate - secondListCreatedDate);
      });
      // Filter the list whose end date was before today
      return {
        ...state,
        sortedListingsByCreatedDate: [...sortedListings.filter((currentListing) => {
          if (new Date(currentListing.endDate) > new Date()) {
            return true;
          }
          return false;
        })],
      };
    }
    case SELECT_LISTING:
      return {
        ...state,
        selectedListingData: { ...action.payload.selectedListingData },
      };
    case DISPLAY_LISTING_DETAILS:
      return { ...state, displayListingDetails: action.payload.displayListingDetails };
    case LOAD_CATEGORIES:
      return { ...state, categories: [...action.payload.categories] };
    case SET_USERNAME:
      return { ...state, loggedInUsername: action.payload.username };
    case SET_USERID:
      return { ...state, loggedInUserId: action.payload.userId };
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
      listing,
    },
  };
}

export function deleteListingAction(listingIndex) {
  return {
    type: DELETE_LISTING,
    payload: {
      listingIndex,
    },
  };
}

export function loadListingsAction(listings) {
  return {
    type: LOAD_LISTINGS,
    payload: {
      listings,
    },
  };
}

export function sortListingsByEndDateAction() {
  return {
    type: SORT_LISTINGS_BY_END_DATE,
  };
}

export function sortAndFilterListingsByCreatedDate() {
  return {
    type: SORT_LISTINGS_BY_CREATED_DATE,
  };
}

export function selectListingAction(selectedListingData) {
  return {
    type: SELECT_LISTING,
    payload: {
      selectedListingData,
    },
  };
}

export function displayListingDetailsAction(displayListingDetails) {
  return {
    type: DISPLAY_LISTING_DETAILS,
    payload: {
      displayListingDetails,
    },
  };
}

// Action function that sets the returned list of categories to state
export function loadCategoriesAction(categories) {
  return {
    type: LOAD_CATEGORIES,
    payload: {
      categories,
    },
  };
}

export function setLoggedInUsername(username) {
  return {
    type: SET_USERNAME,
    payload: {
      username,
    },
  };
}

export function setLoggedInUserId(userId) {
  return {
    type: SET_USERID,
    payload: {
      userId,
    },
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
const { Provider } = GroupBuyContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function GroupBuyProvider({ children }) {
  const [store, dispatch] = useReducer(groupBuyReducer, initialState);
  return (
    <Provider value={{ store, dispatch }}>
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

const BACKEND_URL = 'http://localhost:3004';

export function loadListings(dispatch) {
  axios.get(`${BACKEND_URL}/listings`).then((result) => {
    dispatch(loadListingsAction(result.data.listings));
    dispatch(sortListingsByEndDateAction());
    dispatch(sortAndFilterListingsByCreatedDate());
    dispatch(loadCategoriesAction(result.data.categories));
  });
}

export function findPurchaseCountPerListing(listingId, setProgressPercent) {
  axios.get(`${BACKEND_URL}/purchases/count/${listingId}`).then((result) => {
    setProgressPercent(result.data.purchaseCount);
  });
}

export function createListing(dispatch, listing) {
  return axios.post(`${BACKEND_URL}/addlisting`, listing).then((result) => {
    dispatch(addListingAction());
    return result.data.listing.id;
  });
}

export function saveReceiptToDb(dispatch, uploadedFile) {
  return axios.post(`${BACKEND_URL}/addReceipt`, uploadedFile)
    .then((results) => {
      // what to do after store the img?
      // perhaps save to state and display to user?
      console.log(results);
    });
}
