import React, { Component } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Header from './components/Header';
import uniqid from 'uniqid';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
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
        instructions: '',
        prepTimeInMinutes: 0,
        cookTimeInMinutes: 0,
        ingredientList: []
      }
    }

    this.loadRecipes();
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async loadRecipes() {
    let data = await axios.get('http://localhost:8080/api/recipe')
    .then(({ data }) => data);
    console.log(data);
    this.setState({ list: data});
  }

  async addRecipe(recipe) {
    let response = await axios.post('http://localhost:8080/api/recipe', recipe)
    .then((res) => res);
    console.log(response);
  }

  handleFormChange(newRecipe) {
    console.log(newRecipe);
    this.setState({recipe: newRecipe});
  }

  handleFormSubmit() {
    this.addRecipe(this.state.recipe).then(
      this.setState({
        recipe: {
          name: '',
          description: '',
          instructions: '',
          prepTimeInMinutes: 0,
          cookTimeInMinutes: 0,
          ingredientList: []
        }
      })
    );
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
                            formIngredients={this.state.recipe.ingredientList}
                            formInstructions={this.state.recipe.instructions}
                            formPrepTime={this.state.recipe.prepTimeInMinutes}
                            formCookTime={this.state.recipe.cookTimeInMinutes}
                            recipe={this.state.recipe}
                  />}>
                </Route>
            </Routes>
        
      </Router>   
    );
  }  
}
