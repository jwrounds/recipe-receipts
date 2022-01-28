import React from 'react';
import { RecipeModel } from '../../models/RecipeModel';
import RecipeForm from './RecipeForm';

type RecipeFormContainerProps = {
  title: string;
  tagline: string;
  formId: string;
  recipe: RecipeModel;
  onFormChange: (newRecipe: RecipeModel, formType: string) => void;
  onFormSubmit: (formType: string) => void;
}

const RecipeFormContainer = ({ title, tagline, formId, recipe, onFormChange, onFormSubmit }: RecipeFormContainerProps): JSX.Element => {

  function handleChange(e: any) {
    const newRecipe: RecipeModel = Object.assign({}, recipe);
    const value: string = e.target.value;
    const key: string = e.target.id;

    /**
     * Captures the correct input and incorporates it into the new recipe object
     *  if 'add' button clicked, otherwise simply incorporates the input that has
     *  changed.
     */

    if (key === 'add') {
      let ingredientVal: string = e.target.previousElementSibling.value;
      newRecipe.ingredientList = newRecipe.ingredientList.concat(ingredientVal);
      e.target.previousElementSibling.value = '';
    } else {
      newRecipe[key] = value;
    }
    console.log(newRecipe);
    onFormChange(newRecipe, formId);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onFormSubmit(e.target.id);
  }

  return (
    <RecipeForm title={title}
                tagline={tagline}
                formId={formId}
                onFormSubmit={handleSubmit}
                onFormChange={handleChange}
                recipe={recipe} />
  )
}

export default RecipeFormContainer;