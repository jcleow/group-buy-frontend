import React from 'react';
import AllMyListings from './AllMyListings.jsx';
import AllMyPurchases from './AllMyPurchases.jsx';

export default function MainProfilePage() {
  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col"> */}
      <AllMyListings />
      {/* </div>
        </div>
        <div className="row">
          <div className="col"> */}
      <AllMyPurchases />
      {/* </div>
        </div>
      </div> */}
    </>
  );
}
