import React, { useState, useContext, useEffect } from 'react';
import { GroupBuyContext, setTotalQuantityOrdered } from '../store.jsx';

export default function QuantityPicker({ setTotalQuantity }) {
  const { store, dispatch } = useContext(GroupBuyContext);
  const [quantity, setQuantity] = useState(0);

  const handleDecrementQuantity = () => {
    if (quantity > 0)
    {
      setTotalQuantity(quantity - 1);
      dispatch(setTotalQuantityOrdered(quantity - 1));
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = () => {
    setTotalQuantity(quantity + 1);
    dispatch(setTotalQuantityOrdered(quantity + 1));
    setQuantity(quantity + 1);
  };

  return (
    <div className="col-8 col-md-4">
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-sm btn-block btn-primary font-weight-bolder" onClick={handleDecrementQuantity}>-</button>
        </div>
        <div className="col text-center">
          <span className="text-center">{quantity}</span>
        </div>
        <div className="col">
          <button type="button" className="btn btn-sm btn-block btn-primary font-weight-bolder" onClick={handleIncrementQuantity}>+</button>
        </div>

      </div>
    </div>
  );
}
