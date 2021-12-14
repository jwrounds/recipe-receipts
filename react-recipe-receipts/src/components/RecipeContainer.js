import React, { useState } from 'react';
import { useParams } from 'react-router';
import Recipe from './Recipe';
import RecipeFormContainer from './RecipeFormContainer';

export default function RecipeContainer(props) {
  const params = useParams();
  console.log(props.recipe);
  function edit() {
    props.onEdit();
  }

  function getRecipe() {
    props.getRecipeId(params.id);
  }

  function handleDelete() {
    props.onDelete(props.recipe.id);
  }


  if (!props.recipe || props.recipe.id !== params.id) {
    getRecipe();
  }

  if (props.isEditing) {
    return (
     <RecipeFormContainer 
                 title="Edit Recipe"
                 tagline="Make your changes here."
                 formId="edit"
                 onFormChange={props.onFormChange}
                 onFormSubmit={props.onFormSubmit}
                 recipe={props.recipeInForm}
                 />
    )
  } else if (props.recipe) {
    return (
      <Recipe recipe={props.recipe}
            edit={edit}
            handleDelete={handleDelete} />
    )
  } else {
    return (
      <>
      </>
    )  
  }

}