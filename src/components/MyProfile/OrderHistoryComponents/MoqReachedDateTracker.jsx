import React from 'react';
import moment from 'moment';

export default function MoqReachedDateTracker({ orderTrackerDetails }) {
  let { dateMoqReached } = JSON.parse(orderTrackerDetails);
  if (dateMoqReached !== null) {
    dateMoqReached = moment(dateMoqReached).format('DD/MM/YYYY');
  }

  return (
    <div>
      {dateMoqReached !== null && `MOQ reached: ${dateMoqReached}`}
    </div>
  );
}
