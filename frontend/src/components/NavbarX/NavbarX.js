import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import './NavbarX.css'
function NavbarX({ User, setUser }) {

  const handleLogout = (e) =>{
    e.preventDefault()

    setUser("")
    localStorage.clear();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="px-3">
        Car Sales Information System
      </Navbar.Brand>
      <Nav className="mr-auto px-4">
        <Link className="px-3" to="/">
          Home
        </Link>
        <Link className="px-3" to="/dealers">
          Dealers
        </Link>
        <Link className="px-3" to="/cars">
          Cars
        </Link>
      </Nav>
      <Nav className="ml-auto pl-4 justify-content-end">
        {User !== "" ? (
          <Dropdown className="mr-5">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Profile
            </Dropdown.Toggle>

            <Dropdown.Menu className="Container-dropdown-item">
          
                <Link className="Dropdown-item" to="/account">Account</Link>
            
                <a className="Dropdown-item" onClick={handleLogout}> Log Out</a>
           
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div>
            <Link
              className="px-3 ml-2 btn-sm btn-light text-decoration-none"
              to="/Register"
            >
              Sign Up
            </Link>
            <Link
              className="px-3 ml-2 btn-sm btn-light text-decoration-none"
              to="/Login"
            >
              Sign In
            </Link>
          </div>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavbarX;
