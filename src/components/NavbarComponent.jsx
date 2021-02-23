import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { getInfoFromCookie } from '../helper.js';

export default function NavbarComponent() {
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  useEffect(() => {
    const currUsername = getInfoFromCookie();
    if (currUsername) {
      setLoggedInUsername(currUsername);
    }
  });
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
            <LinkContainer to="/createNewTrip">
              <Nav.Link>Add</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/viewAll">
              <Nav.Link>View All</Nav.Link>
            </LinkContainer>
            {loggedInUsername
              ? <Nav.Link>{loggedInUsername}</Nav.Link>
              : (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
