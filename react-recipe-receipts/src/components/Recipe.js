import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../App.css';

export default class Recipe extends Component {

  render() {
    return (
        <Card className="recipe-card">
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>{this.props.description}</Card.Text>
          </Card.Body>
        </Card>
    )
  }
}