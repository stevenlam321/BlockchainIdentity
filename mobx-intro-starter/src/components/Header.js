
import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';

function Header(props) {
    return (
    <Navbar bg="light" expand="md">
        <Navbar.Brand href="/">HKDID Developers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            {!props.logined  &&
                <Nav.Link href="/login">Login</Nav.Link>
            }
             {!props.logined  && 
                <Nav.Link href="/register">Register</Nav.Link>
             }
              {props.logined  && 
                <Nav.Link href="/logout">Logout</Nav.Link>
             }
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
  }
  export default Header;