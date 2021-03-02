import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GroupBuyContext, getAllPurchasesAssociatedWUser } from '../../store.jsx';
// import AllListingsAsCards from './AllListingsAsCards.jsx';
// import getAllPurchasesAssociatedWUser from '../../store.jsx';
import BACKEND_URL from '../../helper.js';

export default function AllMyPurchases() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { loggedInUsername } = store;
  const [allPurchases, setAllPurchases] = useState([]);

  // query the db to find all purchases connected with this user
  useEffect(() => {
    console.log('loggedInUsername is:');
    console.log(loggedInUsername);
    getAllPurchasesAssociatedWUser(loggedInUsername)
      .then((result) => {
        console.log('result is:');
        console.log(result);
      });

    // setAllPurchases(getAllPurchasesAssociatedWUser(loggedInUsername));

  //   axios.post(`${BACKEND_URL}/allPurchases`, { loggedInUsername })
  //     .then(({ data }) => {
  //       console.log('data is:');
  //       console.log(data);
  //       setAllPurchases(data);
  //     })
  //     .catch((error) => console.log(error));
  }, []);

  const AllListingsTable = () => {
    if (allPurchases.length === 0) return null;
    const formatListingsAsTable = allPurchases.map((eachEl, tableIndex) => (
      <div className="row">
        <div className="col">
          {tableIndex + 1}
        </div>
        <div className="col">
          {eachEl.listing.title}
        </div>
        <div className="col">
          <img src={eachEl.listing.images.img1} alt="listingImg" className="img-responsive" width="100%" />
        </div>
      </div>
    ));

    return formatListingsAsTable;
  };

  return (
    <div className="container ProfilePg-PurchasesTable">
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
