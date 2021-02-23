import React, { useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import SignInForm from './SignInForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';

export default function SignInModal() {
  const [show, setShow] = useState(false);
  const [showRegistration, setShowRegistration] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link onClick={handleShow}>Sign in</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In to Group Buy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!showRegistration
            ? <SignInForm handleClose={handleClose} />
            : <RegistrationForm showRegistration={showRegistration} />}
        </Modal.Body>
      </Modal>
    </>
  );
}
