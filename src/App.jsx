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
import ViewAllMyPurchases from './components/Past purchases/ViewAllMyPurchases.jsx';
import ViewAllListings from './components/ViewAllListings/ViewAllListings.jsx';
import CampaignProgress from './components/CampaignProgress.jsx';

function App() {
  return (
    <GroupBuyProvider>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/createListing" component={CreateListingForm} />
          <Route path="/listingdetails" component={ViewListingPerUser} />
          <Route path="/testPayment" component={MainPaymentPage} />
          <Route path="/viewAllMyPurchases" component={ViewAllMyPurchases} />
          <Route path="/viewAllListings" component={ViewAllListings} />
          <Route path="/campaignProgress" component={CampaignProgress} />
        </Switch>
      </Router>
    </GroupBuyProvider>
  );
}

export default App;
