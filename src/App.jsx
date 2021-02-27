import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';
import { GroupBuyProvider } from './store.jsx';
import HomePage from './components/HomePage.jsx';
import ViewListingPerUser from './components/ViewListingPerUser.jsx';
import CreateListingForm from './components/CreateListing/CreateListingForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPaymentPage from './components/Payments/MainPaymentPage.jsx';
import ViewAllMyPurchases from './components/Past purchases/ViewAllMyPurchases.jsx';
import ViewAllListings from './components/ViewAllListings/ViewAllListings.jsx';

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
          <Route path="/listingdetails" component={ViewListingPerUser} />
          <Route path="/testPayment" component={MainPaymentPage} />
          <Route path="/viewAllMyPurchases" component={ViewAllMyPurchases} />
          <Route path="/viewAllListings" component={ViewAllListings} />
          {/* <Route path="/viewAll" component={ViewAll} />
        <Route path="/createNewTrip" component={NewTripHolder} /> */}
        </Switch>
      </Router>
    </GroupBuyProvider>
  );
}

export default App;
