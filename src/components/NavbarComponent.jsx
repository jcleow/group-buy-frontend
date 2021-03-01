import React, { useContext, useEffect } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInModal from './SignInAndRegistration/SignInModal.jsx';
import { GroupBuyContext, setLoggedInUsername, setLoggedInUserId } from '../store.jsx';
import UsernameBtn from './SignInAndRegistration/UsernameBtn.jsx';
import { getUsernameFromCookie, getUserIdFromCookie } from '../helper.js';

export default function NavbarComponent() {
  const { store, dispatch } = useContext(GroupBuyContext);

  useEffect(() => {
    const currUsername = getUsernameFromCookie();
    const currUserId = getUserIdFromCookie();

    if (currUsername) {
      dispatch(setLoggedInUsername(currUsername));
      dispatch(setLoggedInUserId(currUserId));
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
            {store.loggedInUsername && (
            <LinkContainer to="/createListing">
              <Nav.Link>Add</Nav.Link>
            </LinkContainer>
            )}
            <LinkContainer to="/viewAllListings">
              <Nav.Link>View All</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/testPayment">
              <Nav.Link>[test] payment</Nav.Link>
            </LinkContainer> */}
            <LinkContainer to="/viewAllMyPurchases">
              <Nav.Link>All purchases</Nav.Link>
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
