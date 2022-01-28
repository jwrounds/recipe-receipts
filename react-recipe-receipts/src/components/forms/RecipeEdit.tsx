import React from 'react';
import { useParams } from 'react-router';
import { RecipeModel } from '../../models/RecipeModel';
import RecipeFormContainer from './RecipeFormContainer';

type RecipeEditProps = {
  getRecipe: (id: string) => void;
  onFormChange: (recipe: RecipeModel, id: string) => void;
  onFormSubmit: (id: string) => void;
  recipe: RecipeModel;
}

const RecipeEdit = ({ getRecipe, onFormChange, onFormSubmit, recipe}: RecipeEditProps): JSX.Element => {
  const params = useParams();

  function getRecipeToEdit() {
    if (params.id) {
      getRecipe(params.id);
    }
  }

  if (!recipe) {
    getRecipeToEdit();
  }

  function handleFormChange(newRecipe: RecipeModel, id: string) {
    onFormChange(newRecipe, id);
  }

  function handleFormSubmit(id: string) {
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

export default RecipeEdit;