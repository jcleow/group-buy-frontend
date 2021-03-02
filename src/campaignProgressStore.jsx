import axios from 'axios';
import React, { useReducer } from 'react';

const BACKEND_URL = 'http://localhost:3004';

const LOAD_CURR_LISTING_PURCHASES = 'LOAD_CURR_LISTING_PURCHASES';
const LOAD_PAST_SEVEN_DAYS_COUNT = 'LOAD_PAST_SEVEN_DAYS_COUNT';
const SET_CURR_LISTING_ID = 'SET_CURR_LISTING_ID';

export const initialCampaignState = {
  allPurchases: [],
  pastSevenDaysCount: [],
  currListing: null,
};

export function campaignProgressReducer(state, action) {
  switch (action.type) {
    case LOAD_CURR_LISTING_PURCHASES:
      return { ...state, allPurchases: [...action.payload.currListingPurchases] };
    case SET_CURR_LISTING_ID:
      return { ...state, currListing: action.payload.currListingId };
    case LOAD_PAST_SEVEN_DAYS_COUNT:
      return { ...state, pastSevenDaysCount: action.payload.pastSevenDaysCount };
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

export function loadPastSevenDayPurchaseCountAction(pastSevenDaysCount) {
  return {
    type: LOAD_PAST_SEVEN_DAYS_COUNT,
    payload: {
      pastSevenDaysCount,
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
      const { allFilteredPurchaseData, pastSevenDaysCount } = result.data;
      dispatchCampaign(loadPurchasesAction(allFilteredPurchaseData));
      dispatchCampaign(loadPastSevenDayPurchaseCountAction(pastSevenDaysCount));
    })
    .catch((err) => console.log(err));
}
