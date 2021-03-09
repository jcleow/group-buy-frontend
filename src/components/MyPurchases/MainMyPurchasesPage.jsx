import React, { useEffect, useContext } from 'react';
import './stylesheets/AllMyPurchasesRelated.css';
// import './stylesheets/AllPaymentRelated.css';

import AllPurchasesTable from './AllPurchasesTable.jsx';
import { getUserIdFromCookie } from '../../helper.js';

export default function MainMyPurchasesPage() {
  return (
    <div className="tableContainer">
      <AllPurchasesTable />
    </div>
  );
}
