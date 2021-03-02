import axios from 'axios';
import React, { useReducer } from 'react';

const BACKEND_URL = 'http://localhost:3004';

const LOAD_CURR_LISTING_PURCHASES = 'LOAD_CURR_LISTING_PURCHASES';
const SET_CURR_LISTING_ID = 'SET_CURR_LISTING_ID';

export const initialCampaignState = {
  allPurchases: [],
  currListing: null,
};

export function campaignProgressReducer(state, action) {
  switch (action.type) {
    case LOAD_CURR_LISTING_PURCHASES:
      return { ...state, allPurchases: [...action.payload.currListingPurchases] };
    case SET_CURR_LISTING_ID:
      return { ...state, currListing: action.payload.currListingId };
    default:
      return state;
  }
}

export function loadPurchasesAction(currListingPurchases) {
  return {
    type: LOAD_CURR_LISTING_PURCHASES,
    payload: {
      currListingPurchases,
    },
  };
}

export function setCurrListingId(currListingId) {
  return {
    type: SET_CURR_LISTING_ID,
    payload: {
      currListingId,
    },
  };
}

export const CampaignProgressContext = React.createContext(null);
const { Provider } = CampaignProgressContext;

export function CampaignProgressProvider({ children }) {
  const [campaignStore, dispatchCampaign] = useReducer(campaignProgressReducer, initialCampaignState);

  return (
    <Provider value={{ campaignStore, dispatchCampaign }}>
      {children}
    </Provider>
  );
}

// Requests

export function loadCurrlistingPurchases(dispatchCampaign, currListingId) {
  axios.get(`${BACKEND_URL}/listing/${currListingId}/allPurchases`)
    .then((result) => {
      console.log(result, 'result');
      dispatchCampaign(loadPurchasesAction(result.data.allPurchases));
    })
    .catch((err) => console.log(err));
}
