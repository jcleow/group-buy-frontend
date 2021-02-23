import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Switch>
        {/* <Route path="/home" component={HomePage} />
        <Route path="/viewAll" component={ViewAll} />
        <Route path="/createNewTrip" component={NewTripHolder} /> */}
      </Switch>
    </Router>
  );
}

export default App;
