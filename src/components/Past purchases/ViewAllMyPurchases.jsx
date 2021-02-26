import React, { useContext } from 'react';
import { GroupBuyContext, setLoggedInUsername } from '../../store';

export default function ViewAllMyPurchases() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { loggedInUsername } = store;

  console.log('loggedInUsername is:');
  console.log(loggedInUsername);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          Past purchases
        </div>
      </div>
      <div className="row">
        <div className="col">
          <AllListingsAsCards />
        </div>
      </div>
    </div>
  );
}
