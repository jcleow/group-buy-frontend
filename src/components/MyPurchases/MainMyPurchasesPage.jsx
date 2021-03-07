import React, { useEffect, useContext } from 'react';
import './stylesheets/AllMyPurchasesRelated.css';
// import './stylesheets/AllPaymentRelated.css';

import AllPurchasesTable from './AllPurchasesTable.jsx';

export default function MainMyPurchasesPage() {
  return (
    <div className="tableContainer">
      <AllPurchasesTable />
    </div>
  );
}
