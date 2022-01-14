import React from 'react';
import { useParams } from 'react-router';
import Recipe from './Recipe';

export default function RecipeContainer(props) {
  const params = useParams();

  function getRecipe() {
    props.getRecipeById(params.id);
  }

  function handleDelete() {
    props.onDelete(props.recipe.id);
  }

  if (!props.recipe || props.recipe.id !== params.id) {
    getRecipe();
  }

  if (props.recipe && props.recipe.id === params.id) {
    return (
      <Recipe recipe={props.recipe}
              handleDelete={handleDelete} />
    )
  } else {
    return (
      <>
      </>
    )  
  }

}