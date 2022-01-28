import React from 'react';
import uniqid from 'uniqid';
import '../../App.css';

type IngredientListProps = {
  formIngredients: string[];
  children: React.ReactChild | React.ReactChild[];
}

const IngredientList = ({ formIngredients }: IngredientListProps): JSX.Element => {
  return (
    <div>
      {formIngredients.map((ingredient, index) =>
        <div key={uniqid()}> {index+1}: {ingredient}</div>
      )}
    </div>
  )
}

export default IngredientList;