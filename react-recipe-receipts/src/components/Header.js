import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Header extends Component {
  render() {
    return (
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand >Recipe Receipts</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link>
          <Link to="/">Home</Link>
        </Nav.Link> 
        <Nav.Link>
          <Link to="/add">Add Recipe</Link>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
  }
}
