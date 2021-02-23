import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';
import { GroupBuyProvider } from './store.jsx';
import HomePage from './components/HomePage.jsx';

function App() {
  return (
    <GroupBuyProvider>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route path="/home" component={HomePage} />
          {/* <Route path="/viewAll" component={ViewAll} />
        <Route path="/createNewTrip" component={NewTripHolder} /> */}
        </Switch>
      </Router>
    </GroupBuyProvider>
  );
}

export default App;
