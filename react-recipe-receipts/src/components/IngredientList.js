import React, { Component } from 'react';
import uniqid from 'uniqid';
import '../App.css';


export default class IngredientList extends Component {
  render() {
    return (
      <div>
        {this.props.formIngredients.map((ingredient, index) =>
          <div key={uniqid()}> {index+1}: {ingredient}</div>
        )}
      </div>
    )
  }
}
