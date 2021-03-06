import React from 'react';
import moment from 'moment';

export default function PurchaseDateTracker({ allPurchases }) {
  let { purchaseDate } = JSON.parse(allPurchases);
  purchaseDate = moment(purchaseDate).format('DD/MM/YYYY');

  return (
    <div>
      {`Purchase date: ${purchaseDate}`}
    </div>
  );
}
