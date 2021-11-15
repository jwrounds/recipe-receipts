import React, { Component } from 'react';

export default class Recipe extends Component {

  render() {
    return (
      <>
        <div>{this.props.number} - Recipe Name: {this.props.name}</div>
        <div>- - Recipe Description: {this.props.description}</div>
        { this.props.ingredients.length > 0 &&
          <>
            <div>- - Ingredients:  </div>
            <div>
              {this.props.ingredients.map((ingredient, index) => {
                return index < this.props.ingredients.length-1 ? ingredient + ", " : ingredient;
              })}
            </div>
          </>
        }
        <hr/>
      </>
    )
  }
}