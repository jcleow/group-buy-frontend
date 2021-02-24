import React, { useContext, useEffect } from 'react';
import {
  Navbar, Nav, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInModal from './SignInModal.jsx';
import { GroupBuyContext, setLoggedInUsername } from '../store.jsx';
import UsernameBtn from './UsernameBtn.jsx';
import { getInfoFromCookie } from '../helper.js';

export default function NavbarComponent() {
  const { store, dispatch } = useContext(GroupBuyContext);

  useEffect(() => {
    const currUsername = getInfoFromCookie();

    if (currUsername) {
      dispatch(setLoggedInUsername(currUsername));
    }
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/home">
          <Navbar.Brand>Group Buy App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            <LinkContainer to="/home">
              <Nav.Link> HomePage</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/createListing">
              <Nav.Link>Add</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/viewAll">
              <Nav.Link>View All</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-auto">
            {store.loggedInUsername
              ? (
                <UsernameBtn />
              )
              : (
                <SignInModal />
              )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
