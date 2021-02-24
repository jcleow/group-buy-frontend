import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { CreateListingContext } from '../../createListingStore.jsx';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default function CampaignDates({ setMode }) {
  const { formStore, dispatchListingForm } = useContext(CreateListingContext);
  const { startDate, endDate, deliveryDate } = formStore;
  const [focus, setFocus] = useState({ focus: false });
  const [deliveryFocus, setDeliveryFocus] = useState(false);

  const handleOnChange = (e) => {
    dispatchListingForm({ field: e.target.name, value: e.target.value });
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      dispatchListingForm({
        field: 'startDate',
        value: startDate,
      });
    }
    if (endDate) {
      dispatchListingForm({
        field: 'endDate',
        value: endDate,
      });
    }
  };

  const handleDeliveryDateChange = (deliverDate) => {
    dispatchListingForm({
      field: 'deliveryDate',
      value: deliverDate,
    });
  };

  const handleNextPage = () => {
    setMode('TnCs');
  };

  return (
    <Form>
      <Form.Group controlId="qtyAvailable">
        <Form.Label>Campaign Start and End Date</Form.Label>
        {/* <Form.Control type="number" placeholder="Enter the max number of units" /> */}
        <div>
          <DateRangePicker
            startDate={startDate}
            startDateId={`${startDate}id`}
            endDate={endDate}
            endDateId={`${endDate}id`}
            onDatesChange={handleDatesChange}
            focusedInput={focus}
            onFocusChange={(focus) => setFocus(focus)}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="minOrderQty">
        <Form.Label>Delivery Date</Form.Label>
        <SingleDatePicker
          date={deliveryDate} // momentPropTypes.momentObj or null
          onDateChange={handleDeliveryDateChange} // PropTypes.func.isRequired
          focused={deliveryFocus} // PropTypes.bool
          onFocusChange={({ focused }) => {
            console.log(focused, 'focused');
            setDeliveryFocus(focused); }}
        // PropTypes.func.isRequired
          id="delivery-dates"
        />
      </Form.Group>

      <Form.Group controlId="usualPrice">
        <Form.Label>Usual Price</Form.Label>
        <NumberFormat className="form-control" thousandSeparator prefix="$" fixedDecimalScale />
        <Form.Text className="text-muted">
          Usual Price or MSRP of item sold
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="usualPrice">
        <Form.Label>Discounted Price (per unit)</Form.Label>
        <NumberFormat className="form-control" thousandSeparator prefix="$" fixedDecimalScale />
        <Form.Text className="text-muted">
          Discount Percentage will be calculated for you.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="discountedPrice">
        <Form.Label>Discounted Price %</Form.Label>
        <Form.Label>Discounted Price %</Form.Label>

      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleNextPage}>
        Next
      </Button>
    </Form>
  );
}
