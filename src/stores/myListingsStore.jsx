import axios from 'axios';
import React, { useReducer } from 'react';

const BACKEND_URL = process.env.ENV === 'PRODUCTION' ? 'https://radiant-dusk-04152.herokuapp.com' : 'http://localhost:3004';

const LOAD_MY_LISTINGS = 'LOAD_MY_LISTINGS';
// const SET_CURR_LISTING_ID = 'SET_CURR_LISTING_ID';

export const initialMyListingsState = {
  myListings: [],
  // currListingId: null,
};

export function myListingsReducer(state, action) {
  switch (action.type) {
    case LOAD_MY_LISTINGS:
      return {
        ...state,
        myListings: action.payload.myListings,
      };

    default:
      return state;
  }
}

// Load listing's associated purchases
export function loadMyListingsAction(myListings) {
  return {
    type: LOAD_MY_LISTINGS,
    payload: {
      myListings,
    },
  };
}

export const generateListingsStoreActions = () => {
  const [myListingsStore, dispatchMyListings] = useReducer(myListingsReducer, initialMyListingsState);
  return { myListingsStore, dispatchMyListings };
};

// Requests

export function loadMyListings(dispatchMyListings) {
  axios.get(`${BACKEND_URL}/myListings`)
    .then((result) => {
      dispatchMyListings(loadMyListingsAction(result.data.formattedMyListings));
    })
    .catch((err) => console.log(err));
}

export function updatePurchaseDateDelivered(dispatchCampaign, currListingId, purchaseId, newDate) {
  const formattedNewDate = new Date(newDate);
  axios.put(`${BACKEND_URL}/listing/${currListingId}/purchase/${purchaseId}/date`, { formattedNewDate })
    .then((result) => {
      console.log(result, 'result');
      return loadCurrListingPurchases(dispatchCampaign, currListingId);
    })
    .catch((err) => console.log(err));
}
