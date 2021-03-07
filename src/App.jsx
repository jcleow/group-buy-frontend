import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';
import { GroupBuyProvider } from './store.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ViewListing from './components/DetailedView/ViewListing.jsx';
import CreateListingForm from './components/CreateListing/CreateListingForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyListings from './components/MyListings/MyListings.jsx';
import MainPaymentPage from './components/Payments/MainPaymentPage.jsx';
import ViewAllListings from './components/ViewAllListings/ViewAllListings.jsx';
import MainMyPurchasesPage from './components/MyPurchases/MainMyPurchasesPage.jsx';

// import MainPaymentPage from './components/Payments/MainPaymentPage.jsx';
import CampaignProgress from './components/CampaignProgress/CampaignProgressContainer.jsx';
import EditListing from './components/EditListing/EditListing.jsx';

function App() {
  return (
    <GroupBuyProvider>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/createListing" component={CreateListingForm} />
          <Route path="/listingdetails/:listingId" component={ViewListing} />
          <Route path="/payment" component={MainPaymentPage} />
          <Route path="/viewAllListings" component={ViewAllListings} />
          <Route path="/MyListings" component={MyListings} />
          <Route path="/MyPurchases" component={MainMyPurchasesPage} />
          {/* <Route path="/viewAllMyPurchases" component={ViewAllMyPurchases} /> */}
          <Route path="/editListing/:listingId" component={EditListing} />
          <Route path="/viewProgress/:listingId/" component={CampaignProgress} />
          <Route path="/delete/:listingId/" component={HomePage} />
        </Switch>
      </Router>
    </GroupBuyProvider>
  );
}

export default App;
