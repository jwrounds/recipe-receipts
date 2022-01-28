import React from 'react';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TitleCard from './TitleCard';
import { RecipeModel } from '../../models/RecipeModel';

type RecipeListProps = {
  list: RecipeModel[];
  
}

const RecipeList = ({ list }: RecipeListProps): JSX.Element => {
  return (
    <>
      <TitleCard title="Our Latest Recipes." tagline="Go ahead. Be adventurous."/>
      <Container>
        <div className="recipe-container">
          <div className="card-container">
            {list.map((recipe) =>
              <div key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>
                <RecipeCard 
                            name={recipe.name} 
                            description={recipe.description} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default RecipeList;