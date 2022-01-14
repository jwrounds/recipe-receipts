import React from 'react';
import { useParams } from 'react-router';
import RecipeFormContainer from './RecipeFormContainer';

export default function RecipeEdit({ getRecipe, onFormChange, onFormSubmit, recipe}) {
  const params = useParams();

  function getRecipeToEdit() {
    getRecipe(params.id);
  }

  if (!recipe) {
    getRecipeToEdit();
  }

  function handleFormChange(newRecipe, id) {
    onFormChange(newRecipe, id);
  }

  function handleFormSubmit(id) {
    onFormSubmit(id);
  }
  if (recipe) {
    return (
      <RecipeFormContainer 
                title="Edit Recipe"
                tagline="Make your changes here."
                formId="edit"
                onFormChange={handleFormChange}
                onFormSubmit={handleFormSubmit} 
                recipe={recipe}/> 
     )
  } else {
    return (
      <>
      </>
    )
  }
}