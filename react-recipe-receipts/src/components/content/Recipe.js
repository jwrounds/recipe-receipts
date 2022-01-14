import React from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';

export default function Recipe(props) {
    return (
      <Container className="recipe-detail-container">
        <Stack direction="horizontal" gap={3} style={{ alignSelf: "flex-end"}}>
          <Link to="edit">
            <Button size="sm" variant="secondary" className="edit">Edit Recipe</Button>
          </Link>
          <Button size="sm" variant="secondary" className="delete" onClick={props.handleDelete}>Delete Recipe</Button>
        </Stack>
        
        <h1>{props.recipe.name}</h1>
        <p>{props.recipe.description}</p>
        <hr></hr>
        <h3>Ingredients</h3>
        { props.recipe.ingredientList !== null &&
          <div>
                {props.recipe.ingredientList.map(ingredient => <p key={uniqid()}> - {ingredient}</p>)}
          </div>
        }
        <h3>Instructions</h3>
        <p>{props.recipe.instructions}</p>
      </Container> 

    )
} 