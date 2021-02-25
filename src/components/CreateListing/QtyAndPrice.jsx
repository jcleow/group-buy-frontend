import React, { useContext } from 'react';
import { writeStorage } from '@rehooks/local-storage';
import { Form, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { CreateListingContext } from '../../createListingStore.jsx';

export default function QtyAndPrice({ setMode }) {
  const { formStore, dispatchListingForm, handleOnChange } = useContext(CreateListingContext);

  const ALLOW_OVERSUBSCRIPTION = 'allowOversubscription';
  const handleOversubscriptionStatus = () => {
    dispatchListingForm({ field: ALLOW_OVERSUBSCRIPTION, value: !formStore.allowOversubscription });
    writeStorage(ALLOW_OVERSUBSCRIPTION, !formStore.allowOversubscription);
  };
  console.log(formStore, 'formStore');
  const handleNextPage = () => {
    setMode('CAMPAIGN_DATES');
    writeStorage('formstep', 'CAMPAIGN_DATES');
  };

  const handlePrevPage = () => {
    setMode('ABOUT_ITEM');
  };

  const calcDiscountPct = () => {
    const discountDecimals = 100 - (Number(formStore.discountedPrice?.replace(/[$,]/g, '')) / Number(formStore.usualPrice?.replace(/[$,]/g, ''))) * 100;
    const discountPct = discountDecimals.toFixed(2);
    if (discountPct !== Infinity && discountPct !== 'NaN') {
      return discountPct;
    }
    return '0.00';
  };

  return (
    <Form>
      <Form.Group controlId="qtyAvailable">
        <Form.Label>Quantity Available</Form.Label>
        <Form.Control
          name="quantity"
          type="number"
          placeholder="Enter the max number of units"
          value={formStore.quantity}
          onChange={handleOnChange}
          required
        />
        <Form.Text className="text-muted">
          Total goods you want to sell. Can be oversubscribed by checking the box below.
        </Form.Text>
        <Form.Check
          name="allowOversubscription"
          type="checkbox"
          id="default-checkbox"
          label="Allow oversubscription"
          className="mt-3"
          value={formStore.allowOverSubscription}
          onChange={handleOversubscriptionStatus}
          required
        />
      </Form.Group>

      <Form.Group controlId="minOrderQty">
        <Form.Label>Minimum Order Quantity (MOQ)</Form.Label>
        <Form.Control
          type="number"
          name="moq"
          value={formStore.moq}
          onChange={handleOnChange}
          required
        />
        <Form.Text>
          Minimum subscription quantity to begin fulfillment.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="usualPrice">
        <Form.Label>Usual Price</Form.Label>
        <NumberFormat
          className="form-control"
          name="usualPrice"
          thousandSeparator
          prefix="$"
          fixedDecimalScale
          value={formStore.usualPrice}
          onChange={handleOnChange}
          required
        />
        <Form.Text className="text-muted">
          Usual Price or MSRP of item sold
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="discountedPrice">
        <Form.Label>Discounted Price (per unit)</Form.Label>
        <NumberFormat
          className="form-control"
          name="discountedPrice"
          thousandSeparator
          prefix="$"
          fixedDecimalScale
          value={formStore.discountedPrice}
          onChange={handleOnChange}
          required
        />
        <Form.Text className="text-muted">
          Discount Percentage will be calculated for you.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="discountPct">
        <Form.Label>
          Discount:
          {' '}
          {calcDiscountPct()}
          {' '}
          %
        </Form.Label>
        <Form.Label />

      </Form.Group>

      <div className="d-flex flex-row justify-content-between">
        <Button variant="primary" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </Form>
  );
}
