import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
      </Nav>
    )
}