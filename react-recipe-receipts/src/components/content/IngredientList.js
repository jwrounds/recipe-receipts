import React, { Component } from 'react';
import uniqid from 'uniqid';
import '../App.css';


export default function IngredientList({formIngredients}) {
  return (
    <div>
      {formIngredients.map((ingredient, index) =>
        <div key={uniqid()}> {index+1}: {ingredient}</div>
      )}
    </div>
  )
}
