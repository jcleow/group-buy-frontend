import React from 'react';
import moment from 'moment';

export default function PurchaseDateTracker({ orderTrackerDetails }) {
  let { purchaseDate } = JSON.parse(orderTrackerDetails);
  purchaseDate = moment(purchaseDate).format('DD/MM/YYYY');

  return (
    <div>
      {`Purchase date: ${purchaseDate}`}
    </div>
  );
}
