import React from 'react';
import moment from 'moment';

export default function ReceiptApprovalDateTracker({ allPurchases }) {
  let { dateReceiptApproved } = JSON.parse(allPurchases);
  if (dateReceiptApproved !== null) {
    dateReceiptApproved = moment(dateReceiptApproved).format('DD/MM/YYYY');
  }
  return (
    <div>
      {dateReceiptApproved && `Receipt approved: ${dateReceiptApproved}`}
    </div>
  );
}
