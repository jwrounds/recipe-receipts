import React from 'react';
import { useParams } from 'react-router';
import { RecipeModel } from '../../models/RecipeModel';
import Recipe from './Recipe';

type RecipeContainerProps = {
  recipe: RecipeModel | null;
  onDelete: (id: string) => Promise<void>;
  getRecipeById: (id: string) => Promise<void>;
}

const RecipeContainer = ({ recipe, onDelete, getRecipeById }: RecipeContainerProps): JSX.Element => {
  const params = useParams();

  function getRecipe() {
    if (params.id) {
      getRecipeById(params.id);
    }
  }

  function handleDelete() {
    if (recipe) {
      onDelete(recipe.id);
    }
  }

  if (!recipe || recipe.id !== params.id) {
    getRecipe();
  }

  if (recipe && recipe.id === params.id) {
    return (
      <Recipe recipe={recipe}
              handleDelete={handleDelete} />
    )
  } else {
    return (
      <>
      </>
    )  
  }
}

export default RecipeContainer;