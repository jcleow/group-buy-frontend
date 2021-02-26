import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';
import { GroupBuyProvider } from './store.jsx';
import HomePage from './components/HomePage.jsx';
import DetailedListingView from './components/DetailedListingView.jsx';
import CreateListingForm from './components/CreateListing/CreateListingForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// import MainPaymentPage from './components/Payments/MainPaymentPage.jsx';

function App() {
  return (
    <GroupBuyProvider>
      <Router>
        <NavbarComponent />
        {/* <MainPaymentPage /> */}
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/createListing" component={CreateListingForm} />
          <Route path="/listingdetails" component={DetailedListingView} />
        </Switch>
      </Router>
    </GroupBuyProvider>
  );
}

export default App;
