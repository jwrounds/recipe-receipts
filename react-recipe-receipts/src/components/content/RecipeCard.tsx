import React from 'react';
import { Card } from 'react-bootstrap';
import '../../App.css';

type RecipeCardProps = {
  name: string;
  description: string;
}

const RecipeCard = ({ name, description }: RecipeCardProps): JSX.Element => {
  return (
    <Card className="recipe-card">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>      
  ) 
}

export default RecipeCard;