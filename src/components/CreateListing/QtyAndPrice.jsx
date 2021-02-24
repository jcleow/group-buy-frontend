import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { CreateListingContext } from '../../createListingStore.jsx';

export default function QtyAndPrice({ setMode }) {
  const { formStore, dispatchListingForm } = useContext(CreateListingContext);

  const handleOnChange = (e) => {
    dispatchListingForm({ field: e.target.name, value: e.target.value });
  };

  const handleNextPage = () => {
    setMode('CAMPAIGN_DATES');
  };

  const handlePrevPage = () => {
    setMode('ABOUT_ITEM');
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
        />
        <Form.Text className="text-muted">
          Total goods you want to sell. Can be oversubscribed by checking the box below.
        </Form.Text>
        <Form.Check
          name="overSubscription"
          type="checkbox"
          id="default-checkbox"
          label="Allow oversubscription"
          className="mt-3"
          value={formStore.overSubscription}
          onChange={handleOnChange}
        />
      </Form.Group>

      <Form.Group controlId="minOrderQty">
        <Form.Label>Minimum Order Quantity (MOQ)</Form.Label>
        <Form.Control
          type="number"
          name="moq"
          value={formStore.moq}
          onChange={handleOnChange}
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
        />
        <Form.Text className="text-muted">
          Discount Percentage will be calculated for you.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="discountPct">
        <Form.Label>
          Discount
          {formStore.usualPrice / formStore.discountedPrice - 1}
          {' '}
          %
        </Form.Label>
        <Form.Label />

      </Form.Group>

      <div className="d-flex flex-row justify-content-between">
        <Button variant="primary" type="submit" onClick={handleNextPage}>
          Next
        </Button>

        <Button variant="primary" type="submit" onClick={handlePrevPage}>
          Previous
        </Button>
      </div>
    </Form>
  );
}
