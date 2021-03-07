import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL, GroupBuyContext, setLoggedInUsername } from '../../store.jsx';

export default function UsernameBtn({ collapseNavBar }) {
  const { store, dispatch } = useContext(GroupBuyContext);

  const handleSignOut = () => {
    collapseNavBar();
    axios.put(`${BACKEND_URL}/signOut`, {}, { withCredentials: true })
      .then(() => {
        window.location = '/';
        dispatch(setLoggedInUsername(null));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Nav.Link>
      <DropdownButton id="dropdown-basic-button" key="left" drop="left" title={store.loggedInUsername}>

        <Dropdown.Item>
          <Link
            to="/MyProfile"
            style={{ textDecoration: 'None', color: 'black' }}
            onClick={collapseNavBar}
          >
            My Profile
          </Link>
        </Dropdown.Item>

        <Dropdown.Item>
          <Link
            to="/createListing"
            style={{ textDecoration: 'None', color: 'black' }}
            onClick={collapseNavBar}
          >
            Add New Listing
          </Link>
        </Dropdown.Item>

        <Dropdown.Item>
          <Link
            to="/MyListings"
            style={{ textDecoration: 'None', color: 'black' }}
            onClick={collapseNavBar}
          >
            My Listings
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>

      </DropdownButton>
    </Nav.Link>
  );
}
