import React from 'react';
import { Card } from 'react-bootstrap';

import '../App.css';

export default function RecipeCard(props) {
  return (
    <Card className="recipe-card">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>      
  ) 
}