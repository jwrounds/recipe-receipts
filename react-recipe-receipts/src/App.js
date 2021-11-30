import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import TitleCard from './components/TitleCard';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Navbar from './components/Navbar';

export default function App() {

  const [currentRecipe, setCurrentRecipe] = useState({
      name: '',
      description: '',
      instructions: '',
      prepTimeInMinutes: 0,
      cookTimeInMinutes: 0,
      ingredientList: []
    });
  const [recipeList, setRecipeList] = useState([]);
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

  async function addRecipe(recipe) {
    let response = await axios.post('http://localhost:8080/api/recipe', recipe)
    .then((res) => res);
    if (response.status === 201) {
      navigate("/");
    }
  }

  async function deleteRecipe(id) {
    let response = await axios.delete('http://localhost:8080/api/recipe/' + id)
    .then((res) => res);
    if (response.status === 204) {
      loadRecipes();
    }
  }

  function handleFormChange(newRecipe) {
    console.log(newRecipe);
    setCurrentRecipe(newRecipe);
  }

  function handleFormSubmit() {
    addRecipe(currentRecipe).then(
      setCurrentRecipe({
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
          <Landing />}>
        </Route>
        <Route exact path="/list" element={
          <RecipeList 
                    list={recipeList}
                    onDelete={deleteRecipe} />}>
        </Route>
        <Route path="/add" element={
          <RecipeForm 
                    onFormChange={handleFormChange} 
                    onFormSubmit={handleFormSubmit} 
                    formName={currentRecipe.name}
                    formDescription={currentRecipe.description}
                    formIngredients={currentRecipe.ingredientList}
                    formInstructions={currentRecipe.instructions}
                    formPrepTime={currentRecipe.prepTimeInMinutes}
                    formCookTime={currentRecipe.cookTimeInMinutes}
                    recipe={currentRecipe} />}>
        </Route>
      </Routes>
      <Footer />
    </>
  ); 
  
}