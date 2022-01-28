import React from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import { RecipeModel } from '../../models/RecipeModel';

type RecipeProps = {
  recipe: RecipeModel;
  handleDelete: () => void;
}

const Recipe = ({ recipe, handleDelete }: RecipeProps) => {
    return (
      <Container className="recipe-detail-container">
        <Stack direction="horizontal" gap={3} style={{ alignSelf: "flex-end"}}>
          <Link to="edit">
            <Button size="sm" variant="secondary" className="edit">Edit Recipe</Button>
          </Link>
          <Button size="sm" variant="secondary" className="delete" onClick={handleDelete}>Delete Recipe</Button>
        </Stack>
        
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <hr></hr>
        <h3>Ingredients</h3>
        { recipe.ingredientList !== null &&
          <div>
                {recipe.ingredientList.map(ingredient => <p key={uniqid()}> - {ingredient}</p>)}
          </div>
        }
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </Container> 

    )
} 

export default Recipe;