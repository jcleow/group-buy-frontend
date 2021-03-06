import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { GroupBuyContext, setLoggedInUsername } from '../../store.jsx';
import BACKEND_URL from '../../helper.js';

export default function UsernameBtn() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const handleSignOut = () => {
    axios.put(`${BACKEND_URL}/signOut`, {}, { withCredentials: true })
      .then(() => {
        window.location = '/';
        dispatch(setLoggedInUsername(null));
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Nav.Link>
      <DropdownButton id="dropdown-basic-button" key="left" drop="left" title={store.loggedInUsername}>
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>

        <Dropdown.Item>
          <Link to="/MyListings" style={{ textDecoration: 'none' }}>
            MyListings
          </Link>
        </Dropdown.Item>

      </DropdownButton>
    </Nav.Link>
  );
}
