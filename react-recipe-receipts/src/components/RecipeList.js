import React, { Component } from 'react';
import Recipe from './Recipe';


export default class RecipeList extends Component {

  render() {
    return (
      <div>
        {this.props.list.map((recipe, index) => 
          <Recipe key={recipe.id} name={recipe.name} description={recipe.description} ingredients={recipe.ingredients} number={index+1}/>
        )}
      </div>
    );
  }
}