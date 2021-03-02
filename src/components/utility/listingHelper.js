import moment from 'moment';

export const LISTING_STATUSES = {
  BELOW_MOQ: 'below-moq',
  ABOVE_MOQ: 'above-moq',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const getListingStatusDesc = (listingStatusList) => {
  const listingStatusDesc = {};
  listingStatusList.forEach((listingStatus) => {
    switch (listingStatus)
    {
      case LISTING_STATUSES.BELOW_MOQ: {
        listingStatusDesc[listingStatus] = 'Below MOQ';
        break;
      }
      case LISTING_STATUSES.ABOVE_MOQ: {
        listingStatusDesc[listingStatus] = 'Above MOQ';
        break;
      }
      case LISTING_STATUSES.CANCELLED: {
        listingStatusDesc[listingStatus] = 'Campaign Cancelled';
        break;
      }
      case LISTING_STATUSES.COMPLETED: {
        listingStatusDesc[listingStatus] = 'Campaign Completed';
        break;
      }
      default: {
        break;
      }
    }
  });
  return listingStatusDesc;
};

export const getListingCurrentStatus = (listingStatus) => {
  switch (listingStatus)
  {
    case LISTING_STATUSES.BELOW_MOQ: { return 'Not reached minimum order to activate the deal'; }
    case LISTING_STATUSES.ABOVE_MOQ: { return 'Reached minimum order to activate the deal'; }
    case LISTING_STATUSES.CANCELLED: { return 'Cancelled'; }
    case LISTING_STATUSES.COMPLETED: { return 'Completed'; }
    default: { return ''; }
  }
};

export const isListingCancelled = (listingStatus) => (listingStatus
   === LISTING_STATUSES.CANCELLED);

export const findRelativeSaleEndingTime = (listingEndDate) => {
  const endDate = Date.parse(listingEndDate);
  const now = new Date();
  if ((endDate - now) < 0) {
    // If the deal is ended, no need to provide an option for buying
    // dispatch(setDisplayListingMode(LISTING_VIEW_MODES.DEFAULT_LISTING_VIEW));
    return 'Deal ended';
  }
  const momentEndDate = moment(listingEndDate);
  const momentNow = moment();
  const timeSpan = momentNow.to(momentEndDate);
  return (`Deal ends ${timeSpan}`);
};

export const calcDiscountPct = (discountedPrice, usualPrice) => {
  const discountDecimals = 100 - (Number(discountedPrice?.replace(/[$,]/g, '')) / Number(usualPrice?.replace(/[$,]/g, ''))) * 100;
  const discountPct = discountDecimals.toFixed(2);
  if (discountPct !== Infinity && discountPct !== 'NaN') {
    return discountPct;
  }
  return '0.00';
};
