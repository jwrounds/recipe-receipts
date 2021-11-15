import React, { Component } from 'react';
import uniqid from 'uniqid';


export default class IngredientList extends Component {
  render() {
    return (
     <> 
      <div>
        <h5>Ingredients:</h5>
      </div>
      <div>
        {this.props.formIngredients.map((ingredient, index) =>
          <div key={uniqid()}> {index+1}: {ingredient}</div>
        )}
      </div>
    </>
    )
  }
}
