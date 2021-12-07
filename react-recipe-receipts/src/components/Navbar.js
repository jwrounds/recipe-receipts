import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
    <Nav className="justify-content-end navbar" activeKey="/home">
        <Nav.Item>
          <Nav.Link> <Link to="/">Home</Link> </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link> <Link to="/list">Current Recipes</Link> </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link> <Link to="/add">Add Recipe</Link> </Nav.Link>
        </Nav.Item>
      </Nav>
    )
}