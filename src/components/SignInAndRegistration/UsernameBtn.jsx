import React, { useContext } from 'react';
import { Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { GroupBuyContext, setLoggedInUsername } from '../../store.jsx';
import BACKEND_URL from '../../helper.js';

export default function UsernameBtn() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const handleSignOut = () => {
    axios.put(`${BACKEND_URL}/signOut`, {}, { withCredentials: true })
      .then((result) => {
        console.log(result, 'result');
        dispatch(setLoggedInUsername(null));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Nav.Link>
      <DropdownButton id="dropdown-basic-button" key="left" drop="left" title={store.loggedInUsername}>
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </DropdownButton>
    </Nav.Link>
  );
}
