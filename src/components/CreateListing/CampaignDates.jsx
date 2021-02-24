import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { CreateListingContext } from '../../createListingStore.jsx';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default function CampaignDates({ setMode }) {
  const { formStore, dispatchListingForm, handleOnChange } = useContext(CreateListingContext);
  const {
    startDate, endDate, deliveryDate,
  } = formStore;

  // Focus states for dateRangePicker and singleDatePicker
  const [rangeFocus, setRangeFocus] = useState(false);
  const [deliveryFocus, setDeliveryFocus] = useState(false);

  // const handleOnChange = (e) => {
  //   dispatchListingForm({ field: e.target.name, value: e.target.value });
  // };

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

  const handleDeliveryDateChange = (newDeliveryDate) => {
    dispatchListingForm({
      field: 'deliveryDate',
      value: newDeliveryDate,
    });
  };

  const handleNextPage = () => {
    setMode('TERMS_AND_CONDITIONS');
  };

  return (
    <Form>
      <Form.Group controlId="qtyAvailable">
        <Form.Label>Campaign Start and End Date</Form.Label>
        <div>
          <DateRangePicker
            startDate={startDate}
            startDateId={`${startDate}id`}
            endDate={endDate}
            endDateId={`${endDate}id`}
            onDatesChange={handleDatesChange}
            focusedInput={rangeFocus}
            onFocusChange={(focus) => setRangeFocus(focus)}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="minOrderQty">
        <Form.Label>Delivery Date</Form.Label>
        <div>
          <SingleDatePicker
            date={deliveryDate}
            onDateChange={handleDeliveryDateChange}
            focused={deliveryFocus}
            onFocusChange={({ focused }) => {
              setDeliveryFocus(focused); }}
            id="delivery-dates"
          />
        </div>
      </Form.Group>
      <Form.Group controlId="usualPrice">
        <Form.Label>Delivery Mode</Form.Label>
        <div>
          <Form.Check inline label="Pick Up" name="deliveryMode" value="pickup" type="radio" id="inline-radio-pickup" onClick={handleOnChange} />
          <Form.Check inline label="Electronic" name="deliveryMode" value="electronic" type="radio" id="inline-radio-electronic" onClick={handleOnChange} />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleNextPage}>
        Next
      </Button>
    </Form>
  );
}
