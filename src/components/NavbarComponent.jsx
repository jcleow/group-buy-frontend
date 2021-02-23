import React, { useState, useEffect } from 'react';
import {
  Modal, Button, Navbar, Nav,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginForm from './LoginForm.jsx';
import { getInfoFromCookie } from '../helper.js';

export default function NavbarComponent() {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // To run this everytime to check if user is logged in
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
          </Nav>
          <Nav className="ml-auto">
            {loggedInUsername
              ? <Nav.Link>{loggedInUsername}</Nav.Link>
              : (
                <>
                  <Nav.Link onClick={handleShow}>Sign in</Nav.Link>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <LoginForm />
                    </Modal.Body>
                  </Modal>
                </>
              )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

// (
//   <LinkContainer to="/login">
//     <Nav.Link>Login</Nav.Link>
//   </LinkContainer>
// )}
