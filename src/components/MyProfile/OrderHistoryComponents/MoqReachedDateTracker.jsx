import React from 'react';
import moment from 'moment';

export default function MoqReachedDateTracker({ allPurchases }) {
  let { dateMoqReached } = JSON.parse(allPurchases).listing;
  if (dateMoqReached !== null) {
    dateMoqReached = moment(dateMoqReached).format('DD/MM/YYYY');
  }

  return (
    <div>
      {dateMoqReached !== null && `MOQ reached: ${dateMoqReached}`}
    </div>
  );
}
