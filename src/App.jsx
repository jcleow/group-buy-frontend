import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';
import { GroupBuyProvider } from './store.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ViewListingPerUser from './components/DetailedView/ViewListingPerUser.jsx';
import CreateListingForm from './components/CreateListing/CreateListingForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPaymentPage from './components/Payments/MainPaymentPage.jsx';
import ViewAllListings from './components/ViewAllListings/ViewAllListings.jsx';
import MainProfilePage from './components/MyProfile/MainProfilePage.jsx';

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
          <Route path="/payment" component={MainPaymentPage} />
          <Route path="/viewAllListings" component={ViewAllListings} />
          <Route path="/MyProfile" component={MainProfilePage} />
          {/* <Route path="/viewAllMyPurchases" component={ViewAllMyPurchases} /> */}
          {/* <Route path="/viewAll" component={ViewAll} />
        <Route path="/createNewTrip" component={NewTripHolder} /> */}
        </Switch>
      </Router>
    </GroupBuyProvider>
  );
}

export default App;
