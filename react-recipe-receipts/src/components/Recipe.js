import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

export default class Recipe extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
        <Card className="recipe-card">
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>{this.props.description}</Card.Text>
          </Card.Body>
          <Button size="sm" variant="danger" className="delete" onClick={this.handleDelete}>Delete</Button>
        </Card>
    )
  }
}