import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link> <Link to="/">Home</Link> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link> <Link to="/add">Add Recipe</Link> </Nav.Link>
          </Nav.Item>
        </Nav>
        <h1>Recipe Receipts</h1>
      </div>
      
    )
  }
}
