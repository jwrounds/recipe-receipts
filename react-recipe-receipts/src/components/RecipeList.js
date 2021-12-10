import React from 'react';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TitleCard from './TitleCard';


export default function RecipeList(props) {
  return (
    <>
      <TitleCard title="Our Latest Recipes." tagline="Go ahead. Be adventurous."/>
      <Container>
        <div className="recipe-container">
          <div className="card-container">
            {props.list.map((recipe) =>
              <div key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>
                <RecipeCard 
                            id={recipe.id} 
                            name={recipe.name} 
                            description={recipe.description} 
                            onRecipeClick={props.onRecipeClick} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
  
}