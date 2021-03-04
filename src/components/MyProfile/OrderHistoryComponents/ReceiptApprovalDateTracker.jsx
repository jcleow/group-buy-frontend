import React from 'react';
import moment from 'moment';

export default function ReceiptApprovalDateTracker({ orderTrackerDetails }) {
  let { dateReceiptApproved } = JSON.parse(orderTrackerDetails);
  if (dateReceiptApproved !== null) {
    dateReceiptApproved = moment(dateReceiptApproved).format('DD/MM/YYYY');
  }
  return (
    <div>
      {dateReceiptApproved && `Receipt approved: ${dateReceiptApproved}`}
    </div>
  );
}
