import React, { useState, useContext, useEffect } from 'react';
import { GroupBuyContext } from '../store.jsx';

export default function QuantityPicker() {
  const { store, dispatch } = useContext(GroupBuyContext);

  const [quantity, setQuantity] = useState(0);

  const handleDecrementQuantity = () => {
    if (quantity > 0)
    {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = () => {
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
