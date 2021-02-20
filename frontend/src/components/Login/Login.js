import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Home from "../Home/Home";
function Login({ setUser ,setUsername}) {
  const [Email, SetEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Errors, setError] = useState("");
  const [Login, setLogin] = useState(false);
  const emailHandler = (e) => {
    SetEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const response = await axios
      .post("http://localhost:7000/users/login", {
        email: Email,
        password: Password,
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });


    if (response && response.data) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username',response.data.username)
      setLogin(true);
      setUser(response.data.token);
      setUsername(response.data.username)
    }
  };

  return (
    <div className="Register shadow mb-5 bg-white rounded">
      <Form className="Form">
        <h2 className="heading"> Sign In </h2>
        <div className="error-container">
          {Errors.length > 0 ? (
            <div class="alert alert-warning" role="alert">
              {Errors}
            </div>
          ) : Login ? (
            <div class="alert alert-success" role="alert">
              Successfully Loged In
            </div>
          ) : null}
        </div>
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
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          onClick={loginHandler}
          className="submit"
          variant="secondary"
          type="submit"
        >
        {Login ?Redirect(
        <Redirect push to='/'/>
        ):
        (null)
        }
        Sign In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
