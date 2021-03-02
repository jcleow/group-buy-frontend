import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GroupBuyContext } from '../../store.jsx';
// import AllListingsAsCards from './AllListingsAsCards.jsx';
import BACKEND_URL from '../../helper.js';

export default function AllMyPurchases() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { loggedInUsername } = store;
  const [allPurchases, setAllPurchases] = useState([]);

  // query the db to find all purchases connected with this user
  useEffect(() => {
    console.log('loggedInUsername is:');
    console.log(loggedInUsername);
    axios.post(`${BACKEND_URL}/allPurchases`, { loggedInUsername })
      .then(({ data }) => {
        console.log('data is:');
        console.log(data);
        setAllPurchases(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const AllListingsTable = () => {
    if (allPurchases.length === 0) return null;
    const formatListingsAsTable = allPurchases.map((eachEl, tableIndex) => (
      <div className="row">
        <div className="col">
          {tableIndex}
        </div>
        <div className="col">
          {eachEl.listing.title}
        </div>
        <div className="col">
          <img src={eachEl.listing.images.img1} alt="listingImg" />
        </div>
      </div>
    ));

    return formatListingsAsTable;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          Past purchases
        </div>
      </div>
      <div className="row">
        <div className="col">
          <AllListingsTable />
        </div>
      </div>
    </div>
  );
}
