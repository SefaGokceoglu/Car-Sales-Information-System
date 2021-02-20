import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./register.css";
import { Redirect } from "react-router-dom";

function Register({setUser,setUsername}) {
  const [username, setusername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [VerifyPassword, setVerifyPassword] = useState("");
  const [RegisterCheck, setRegisterCheck] = useState(false);
  const [Errors, setErrors] = useState("");

  const usernameHandler = (e) => {
    console.log(e.target.value);
    setusername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const passwordVerifyHandler = (e) => {
    setVerifyPassword(e.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios
      .post("http://localhost:7000/users/register", {
        username: username,
        email: Email,
        password: Password,
        passwordVerify: VerifyPassword,
      })
      .catch((err) => setErrors(err.response.data.msg));

    if (response && response.data) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username',response.data.username)
      setRegisterCheck(true);
      setUser(response.data.token)
      setUsername(response.data.username)
    }
  }
  return (
    <div className="Register shadow mb-5 bg-white rounded">
      <Form className="Form">
        <h2 className="heading"> Sign Up </h2>
        <div className="error-container">
          {Errors.length > 0 ? (
            <div class="alert alert-warning" role="alert">
              {Errors}
            </div>
          ) : RegisterCheck ? (
            <div class="alert alert-success" role="alert">
              Sign Up Successfu
            </div>
          ) : null}
        </div>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={usernameHandler}
            value={username}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailHandler}
            value={Email}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
            value={Password}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword1">
          <Form.Label>Verify Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordVerifyHandler}
            value={VerifyPassword}
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant="secondary" type="submit">
        {RegisterCheck ? Redirect(
        <Redirect push to='/'/>
        ):
        (null)
        }
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
