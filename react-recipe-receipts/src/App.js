import React, { Component } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Header from './components/Header';
import uniqid from 'uniqid';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [], 
      recipe: {
        name: '',
        description: '',
        ingredients: [],
        id: uniqid()
      }
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(newRecipe) {
    this.setState({recipe: newRecipe});
  }

  handleFormSubmit() {
    this.setState({
      list: this.state.list.concat(this.state.recipe),
      recipe: {
        name: '',
        description: '',
        ingredients: [],
        id: uniqid()
      }
    });
  }
  

  render() {
    return (
      <Router>
      <div className="main-background"></div>
        <Header />
              <Routes>
                <Route exact path="/" element={<RecipeList list={this.state.list}/>}>
                </Route>
                <Route path="/add" element={
                  <RecipeForm 
                            onFormChange={this.handleFormChange} 
                            onFormSubmit={this.handleFormSubmit} 
                            formName={this.state.recipe.name}
                            formDescription={this.state.recipe.description}
                            formIngredients={this.state.recipe.ingredients}
                            recipe={this.state.recipe}
                  />}>
                </Route>
            </Routes>
        
      </Router>   
    );
  }  
}
