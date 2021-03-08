import axios from 'axios';
import React, { useReducer } from 'react';
import { BACKEND_URL } from './store.jsx';

const LOAD_CURR_LISTING_PURCHASES = 'LOAD_CURR_LISTING_PURCHASES';
const LOAD_PAST_SEVEN_DAYS_COUNT = 'LOAD_PAST_SEVEN_DAYS_COUNT';

export const initialCampaignState = {
  allPurchases: [],
  pastSevenDaysCount: [],
  currListingId: null,
};

export function campaignProgressReducer(state, action) {
  switch (action.type) {
    case LOAD_CURR_LISTING_PURCHASES:
      return {
        ...state,
        allPurchases: [...action.payload.currListingPurchases],
        currListingId: action.payload.currListingId,
      };

    case LOAD_PAST_SEVEN_DAYS_COUNT:
      return { ...state, pastSevenDaysCount: action.payload.pastSevenDaysCount };
    default:
      return state;
  }
}

// Load listing's associated purchases
export function loadPurchasesAction(currListingPurchases, currListingId) {
  return {
    type: LOAD_CURR_LISTING_PURCHASES,
    payload: {
      currListingPurchases,
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

export function loadCurrListingPurchases(dispatchCampaign, currListingId) {
  axios.get(`${BACKEND_URL}/listing/${currListingId}/allPurchases`)
    .then((result) => {
      const { allFilteredPurchaseData, pastSevenDaysCount } = result.data;
      dispatchCampaign(loadPurchasesAction(allFilteredPurchaseData, currListingId));
      dispatchCampaign(loadPastSevenDayPurchaseCountAction(pastSevenDaysCount));
    })
    .catch((err) => {
      console.log(err);
      window.location = '/error';
    });
}

export function updatePurchaseDateDelivered(dispatchCampaign, currListingId, purchaseId, newDate) {
  // Convert newDate of dd/mm/yyyy to mm/dd/yyyy as Date constructor only accepts the latter format
  const newDateArr = newDate.split('/');
  const formattedDateStr = `${newDateArr[1]}/${newDateArr[0]}/${newDateArr[2]}`;
  const formattedNewDate = new Date(formattedDateStr);

  axios.put(`${BACKEND_URL}/listing/${currListingId}/purchase/${purchaseId}/date`, { formattedNewDate })
    .then(() => loadCurrListingPurchases(dispatchCampaign, currListingId))
    .catch((err) => console.log(err));
}
