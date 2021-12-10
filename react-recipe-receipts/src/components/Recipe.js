import React, { useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import { useParams } from 'react-router';
import RecipeForm from './RecipeForm';
import uniqid from 'uniqid';

export default function Recipe(props) {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);


  function handleDelete() {
    props.onDelete(props.recipe.id);
  }

  function handleEditSubmit(recipe) {
    props.onRecipeUpdate(recipe);
  }

  function handleEditChange(updatedRecipe) {
    console.log(updatedRecipe);
  }

  function edit() {
    setIsEditing(true);
  }

  function getRecipe() {
    props.getRecipeId(params.id);
  }

  if (!props.recipe || props.recipe.id !== params.id) {
    getRecipe();
  }


  if (isEditing) {
    return (
     <RecipeForm 
                 onFormChange={handleEditChange}
                 onFormSubmit={handleEditSubmit}
                 formName={props.recipe.name || ""}
                 formDescription={props.recipe.description || ""}
                 formIngredients={props.recipe.ingredientList || []}
                 formInstructions={props.recipe.instructions || ""}
                 formPrepTime={props.recipe.prepTimeInMinutes || 0}
                 formCookTime={props.recipe.cookTimeInMinutes || 0}
                 recipe={props.recipe}
                 />
    )
  } else if (props.recipe) {
    return (
        <>
          <Container className="recipe-detail-container">
            <Stack direction="horizontal" gap={3} style={{ alignSelf: "flex-end"}}>
              <Button size="sm" variant="secondary" className="edit" onClick={edit}>Edit Recipe</Button>
              <Button size="sm" variant="secondary" className="delete" onClick={handleDelete}>Delete Recipe</Button>
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
        </>
     )
    } else {
    return (
      <>
      </>
    )
  }
}