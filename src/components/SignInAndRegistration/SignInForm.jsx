import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import {
  BACKEND_URL, GroupBuyContext, setLoggedInUsername, setLoggedInUserId,
} from '../../store.jsx';

export default function SignInForm({ handleClose, setFormDisplay }) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { store, dispatch } = useContext(GroupBuyContext);

  function handleUsernameInput(event) {
    setUsernameInput(event.target.value);
  }

  function handlePasswordInput(event) {
    setPasswordInput(event.target.value);
  }

  function handleSignIn() {
    const signInData = { usernameInput, passwordInput };
    // window.location = '/home';
    axios.put(`${BACKEND_URL}/signIn`, signInData, { withCredentials: true })
      .then((result) => {
        setUsernameInput('');
        setPasswordInput('');
        console.log(result.data.user, 'data.user');
        if (result.data.auth) {
          dispatch(setLoggedInUsername(result.data.user.username));
          dispatch(setLoggedInUserId(result.data.user.id));
          window.location.reload();
        }
        handleClose();
      })
      .catch((error) => console.log(error));
  }
  function handleRegistration() {
    setFormDisplay('registration');
  }
  return (
    <div className="login-form">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={handleUsernameInput}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            value={passwordInput}
            onChange={handlePasswordInput}
            required
          />
        </Form.Group>
        <div className="col d-flex justify-content-center">
          {'Don\'t have an account?'}
          <button type="submit" className="bg-transparent border-0 text-primary" onClick={handleRegistration}>Register</button>
        </div>
        <div className="col d-flex justify-content-center">
          <Button variant="secondary" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </Form>

    </div>
  );
}
