import React, { Component } from 'react';
import Recipe from './Recipe';
import Navbar from './Navbar';
import { Container, Nav } from 'react-bootstrap';
import TitleCard from './TitleCard';


export default class RecipeList extends Component {

  render() {
    return (
      <>
        <TitleCard title="Our Latest Recipes" tagline="Go ahead. Be adventurous."/>
        <Container>
          <div className="recipe-container">
            <div className="card-container">
              {this.props.list.map((recipe) => 
                <Recipe key={recipe.id} id={recipe.id} name={recipe.name} description={recipe.description} onDelete={this.props.onDelete}/>
              )}
            </div>
          </div>
        </Container>
      </>
    );
  }
}