import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Recipe from './components/Recipe';
import axios from 'axios';
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Navbar from './components/Navbar';

export default function App() {

  const [recipeInForm, setRecipeInForm] = useState({
      name: '',
      description: '',
      instructions: '',
      prepTimeInMinutes: 0,
      cookTimeInMinutes: 0,
      ingredientList: []
    });
  const [recipeList, setRecipeList] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (recipeList.length === 0) {
      loadRecipes();
    }
  })

  async function loadRecipes() {
    let data = await axios.get('http://localhost:8080/api/recipe')
      .then(({ data }) => data);
    setRecipeList(data);
  }

  async function loadRecipe(id) {
    let data = await axios.get(`http://localhost:8080/api/recipe/view/${id}`)
      .then(({ data }) => data);
    console.log(data);
    setCurrentRecipe(data);
  }

  async function addRecipe(recipe) {
    let response = await axios.post('http://localhost:8080/api/recipe', recipe)
    .then((res) => res);
    if (response.status === 201) {
      navigate("/recipes");
    }
  }

  async function updateRecipe(recipe) {
    let response = await axios.post('http://localhost:8080/api/recipe', recipe)
    .then((res) => res);
    if (response.status === 201) {
      navigate(`/recipes/${recipe.id}`);
    }
  }

  async function deleteRecipe(id) {
    let response = await axios.delete(`http://localhost:8080/api/recipe/${id}`)
    .then((res) => res);
    if (response.status === 204) {
      loadRecipes();
    }
  }

  function handleRecipeDetailView(recipeId) {
    loadRecipe(recipeId);
  }

  function handleRecipeUpdate(recipe) {
    updateRecipe(recipe);
  }

  function handleFormChange(newRecipe) {
    setRecipeInForm(newRecipe);
  }

  function handleFormSubmit() {
    addRecipe(recipeInForm).then(
      setRecipeInForm({
        name: '',
        description: '',
        instructions: '',
        prepTimeInMinutes: 0,
        cookTimeInMinutes: 0,
        ingredientList: []
      })
    );
  }
  
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={
          <Landing />} />
        <Route exact path="/recipes" element={
          <RecipeList 
                    list={recipeList}
                    onRecipeClick={handleRecipeDetailView}/>}/>
        <Route path="/recipes/:id" element={
          <Recipe recipe={currentRecipe} 
                    getRecipeId={handleRecipeDetailView}
                    onDelete={deleteRecipe}
                    onRecipeUpdate={handleRecipeUpdate} />} />
        <Route path="/add" element={
          <RecipeForm 
                    onFormChange={handleFormChange} 
                    onFormSubmit={handleFormSubmit} 
                    formName={recipeInForm.name}
                    formDescription={recipeInForm.description}
                    formIngredients={recipeInForm.ingredientList}
                    formInstructions={recipeInForm.instructions}
                    formPrepTime={recipeInForm.prepTimeInMinutes}
                    formCookTime={recipeInForm.cookTimeInMinutes}
                    recipe={recipeInForm} />} />
      </Routes>
      <Footer />
    </>
  ); 
 
}