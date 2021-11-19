import React, { Component } from 'react';
import Recipe from './Recipe';
import { Container } from 'react-bootstrap';


export default class RecipeList extends Component {

  render() {
    return (
      <Container>
        <div className="card-container">
          {this.props.list.map((recipe) => 
            <Recipe key={recipe.id} name={recipe.name} description={recipe.description}/>
          )}
        </div>
      </Container>
    );
  }
}