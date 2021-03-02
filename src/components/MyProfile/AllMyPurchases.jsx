import React, { useContext, useEffect, useState } from 'react';
import { GroupBuyContext, getAllPurchasesAssociatedWUser } from '../../store.jsx';

export default function AllMyPurchases() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { loggedInUsername } = store;
  const [allPurchases, setAllPurchases] = useState([]);

  // query the db to find all purchases connected with this user
  useEffect(async () => {
    console.log('loggedInUsername is:');
    console.log(loggedInUsername);
    const AllPurchasesAssociatedWUser = await getAllPurchasesAssociatedWUser(loggedInUsername);
    console.log(AllPurchasesAssociatedWUser);

    setAllPurchases(AllPurchasesAssociatedWUser);
  }, []);

  const AllPurchasesTable = () => {
    if (allPurchases.length === 0) return (<div>No purchases to display</div>);
    const formatPurchasesAsTable = allPurchases.map((eachEl, tableIndex) => (
      <div className="row">
        <div className="col-1">
          {tableIndex + 1}
        </div>

        {/* Item name/title */}
        <div className="col-2">
          {eachEl.createdAt}
        </div>
        {/* Item img */}
        <div className="col-2">
          {eachEl.listing.title}

          <img src={eachEl.listing.images.img1} alt="listingImg" className="img-responsive" width="100%" />
        </div>

        {/* proof of payment (i.e. receipt) */}
        <div className="col-2">
          {eachEl.paymentReceipt}
          Submitted on
          {' '}
          {eachEl.updatedAt}

        </div>

      </div>
    ));

    return formatPurchasesAsTable;
  };

  return (

    <div className="container ProfilePg-PurchasesTable">
      <div className="row">
        <div className="col">
          Past purchases
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          S/n
        </div>
        <div className="col-2">
          <button type="button">Date purchased</button>
        </div>
        <div className="col-2">
          <button type="button">Item</button>
        </div>
        <div className="col-2">
          <button type="button">Payment details</button>
          {' '}

        </div>
      </div>
      <div className="row">
        <div className="col">
          <AllPurchasesTable />
        </div>
      </div>
    </div>

  );
}
