import React from 'react';
import RecipeForm from './RecipeForm';

export default function RecipeFormContainer(props) {

  function handleChange(e) {
    const newRecipe = Object.assign({}, props.recipe);
    const value = e.target.value;
    const key = e.target.id;

    /**
     * Captures the correct input and incorporates it into the new recipe object
     *  if 'add' button clicked, otherwise simply incorporates the input that has
     *  changed.
     */

    if (key === 'add') {
      let ingredientVal = e.target.previousElementSibling.value;
      let ingredientId = e.target.previousElementSibling.id;
      newRecipe[ingredientId] = newRecipe[ingredientId].concat(ingredientVal);
      e.target.previousElementSibling.value = '';
    } else {
      newRecipe[key] = value;
    }
    console.log(newRecipe);
    props.onFormChange(newRecipe, props.formId);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onFormSubmit(e.target.id);
  }

  return (
    <RecipeForm title={props.title}
                tagline={props.tagline}
                formId={props.formId}
                onFormSubmit={handleSubmit}
                onFormChange={handleChange}
                recipe={props.recipe} />
  )

}