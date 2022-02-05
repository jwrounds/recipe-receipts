import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
    return (
      <Nav className="justify-content-end navbar" activeKey="/home">
        <Nav.Item>
          <Link to="/">Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/recipes">Current Recipes</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/add">Add Recipe</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/auth/login">Login</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/auth/signup">Signup</Link>
        </Nav.Item>
      </Nav>
    )
}

export default Navbar;