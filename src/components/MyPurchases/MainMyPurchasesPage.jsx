import React, { useEffect, useContext } from 'react';
import './stylesheets/AllMyPurchasesRelated.css';
// import './stylesheets/AllPaymentRelated.css';

import AllPurchasesTable from './AllPurchasesTable.jsx';
import { getUserIdFromCookie } from '../../helper.js';

export default function MainMyPurchasesPage() {
  // Redirect user to error page if not signed in
  useEffect(() => {
    const loggedInUserId = getUserIdFromCookie();
    if (!loggedInUserId) {
      window.location = '/error';
    }
  }, []);
  return (
    <div className="tableContainer">
      <AllPurchasesTable />
    </div>
  );
}
