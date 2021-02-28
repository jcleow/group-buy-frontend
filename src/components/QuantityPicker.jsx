import React, { useContext, useEffect } from 'react';
import { GroupBuyContext, setTotalQuantityOrdered } from '../store.jsx';

export default function QuantityPicker() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { totalQuantityOrdered } = store;

  const handleDecrementQuantity = () => {
    if (totalQuantityOrdered > 0)
    {
      dispatch(setTotalQuantityOrdered(totalQuantityOrdered - 1));
    }
  };

  const handleIncrementQuantity = () => {
    dispatch(setTotalQuantityOrdered(totalQuantityOrdered + 1));
  };

  useEffect(() => {
    dispatch(setTotalQuantityOrdered(totalQuantityOrdered));
  }, []);

  return (
    <div className="col-8 col-md-4">
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-sm btn-block btn-primary font-weight-bolder" onClick={handleDecrementQuantity}>-</button>
        </div>
        <div className="col text-center">
          <span className="text-center">{totalQuantityOrdered}</span>
        </div>
        <div className="col">
          <button type="button" className="btn btn-sm btn-block btn-primary font-weight-bolder" onClick={handleIncrementQuantity}>+</button>
        </div>

      </div>
    </div>
  );
}
