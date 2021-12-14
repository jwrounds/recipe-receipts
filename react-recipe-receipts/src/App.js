import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeFormContainer from './components/RecipeFormContainer';
import RecipeContainer from './components/RecipeContainer';

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
  const [isEditing, setIsEditing] = useState(false);
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
    setCurrentRecipe(data);
  }

  async function addRecipe(recipe) {
    let response = await axios.post('http://localhost:8080/api/recipe', recipe)
    .then((res) => res);
    if (response.status === 201) {
      navigate("/recipes");
      loadRecipes();
    }
  }

  async function updateRecipe(recipe) {
    console.log(recipeInForm, recipe);
    let response = await axios.put('http://localhost:8080/api/recipe', recipe)
    .then((res) => {
      if (res.status === 200) {
        setIsEditing(false);
        loadRecipe(recipe.id);
      }
    });
  }

  async function deleteRecipe(id) {
    let response = await axios.delete(`http://localhost:8080/api/recipe/${id}`)
    .then((res) => res);
    if (response.status === 204) {
      loadRecipes();
    }
  }

  function resetRecipeInForm() {
    setRecipeInForm({
      name: '',
      description: '',
      instructions: '',
      prepTimeInMinutes: 0,
      cookTimeInMinutes: 0,
      ingredientList: []
    });
  }

  function handleRecipeDetailView(recipeId) {
    loadRecipe(recipeId);
  }

  function handleRecipeEdit() {
    setIsEditing(true);
    setRecipeInForm(currentRecipe);
  }

  function handleFormChange(newRecipe) {
    setRecipeInForm(newRecipe);
  }

  function handleFormSubmit(type) {
    if (type === 'add') {
      addRecipe(recipeInForm).then(
        resetRecipeInForm()
      );
    } else if (type === 'edit') {
      updateRecipe(recipeInForm).then(
        resetRecipeInForm()
      );
    }
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
          <RecipeContainer                   
                    getRecipeId={handleRecipeDetailView}
                    isEditing={isEditing}
                    onDelete={deleteRecipe}
                    onEdit={handleRecipeEdit}
                    onFormChange={handleFormChange}
                    onFormSubmit={handleFormSubmit} 
                    recipe={currentRecipe}
                    recipeInForm={recipeInForm} />} />
        <Route path="/add" element={
          <RecipeFormContainer 
                    title="Add Your Recipe"
                    tagline="We know it's going to be great."
                    formId="add"
                    onFormChange={handleFormChange} 
                    onFormSubmit={handleFormSubmit} 
                    recipe={recipeInForm} />} />
      </Routes>
      <Footer />
    </>
  ); 
 
}