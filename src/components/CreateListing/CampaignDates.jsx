import React, { useState, useContext } from 'react';
import { writeStorage } from '@rehooks/local-storage';
import { Form, Button } from 'react-bootstrap';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { CreateListingContext, CREATE_LISTING_FORM } from '../../createListingStore.jsx';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default function CampaignDates({ setMode }) {
  // constant field names
  const START_DATE = 'startDate';
  const END_DATE = 'endDate';
  const DELIVERY_DATE = 'deliveryDate';

  const {
    formStore, dispatchListingForm, handleOnChange, formLocalStorage,
  } = useContext(CreateListingContext);
  const {
    startDate, endDate, deliveryDate,
  } = formStore;

  // Focus states for dateRangePicker and singleDatePicker
  const [rangeFocus, setRangeFocus] = useState(false);
  const [deliveryFocus, setDeliveryFocus] = useState(false);

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      dispatchListingForm({
        field: START_DATE,
        value: startDate,
      });
      writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [START_DATE]: startDate });
    }
    if (endDate) {
      dispatchListingForm({
        field: END_DATE,
        value: endDate,
      });
      writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [END_DATE]: endDate });
    }
  };

  const handleDeliveryDateChange = (newDeliveryDate) => {
    dispatchListingForm({
      field: DELIVERY_DATE,
      value: newDeliveryDate,
    });
    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [DELIVERY_DATE]: newDeliveryDate });
  };

  const handleNextPage = () => {
    setMode('TERMS_AND_CONDITIONS');
    writeStorage('formstep', 'TERMS_AND_CONDITIONS');
  };

  const handlePrevPage = () => {
    setMode('QTY_AND_PRICE');
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
