import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeFormContainer from './components/RecipeFormContainer';
import RecipeContainer from './components/RecipeContainer';
import RecipeEdit from './components/RecipeEdit';

export default function App() { 

  const recipeTemplate = {
    name: '',
    description: '',
    instructions: '',
    prepTimeInMinutes: 0,
    cookTimeInMinutes: 0,
    ingredientList: []
  };

  const [recipeInForm, setRecipeInForm] = useState(Object.assign({}, recipeTemplate));
  const [recipeInEdit, setRecipeInEdit] = useState();
  const [recipeList, setRecipeList] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState();
  const navigate = useNavigate();


  console.log(recipeInEdit, currentRecipe);
  
  useEffect(() => {
    if (recipeList.length === 0) {
      loadRecipes();
    }

    if (currentRecipe && !recipeInEdit) {
      setRecipeInEdit(currentRecipe);
    } else if (recipeInEdit && (recipeInEdit.id !== currentRecipe.id)) {
      setRecipeInEdit(currentRecipe);
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
      loadRecipes();
    }
  }

  async function updateRecipe(recipe) {
    await axios.put('http://localhost:8080/api/recipe', recipe)
    .then((res) => {
      if (res.status === 200) {
        loadRecipe(recipe.id);
        navigate(`recipes/${recipe.id}`);
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
    setRecipeInForm(Object.assign({}, recipeTemplate)); 
  }

  function handleRecipeDetailView(recipeId) {
    loadRecipe(recipeId);
  }

  function handleRecipeEdit(recipeId) {
    loadRecipe(recipeId);
  }

  function handleFormChange(newRecipe, formType) {
    if (formType === 'add') {
      setRecipeInForm(newRecipe);
    } else if (formType === 'edit') {
      setRecipeInEdit(newRecipe);
    }
  }

  function handleFormSubmit(formType) {
    if (formType === 'add') {
      addRecipe(recipeInForm).then(
        setRecipeInForm(Object.assign({}, recipeTemplate))
      );
    } else if (formType === 'edit') {
      updateRecipe(recipeInEdit).then(
        setRecipeInEdit(Object.assign({}, recipeTemplate))
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
                    getRecipeById={handleRecipeDetailView}
                    onDelete={deleteRecipe}
                    onFormChange={handleFormChange}
                    onFormSubmit={handleFormSubmit} 
                    recipe={currentRecipe}
                    recipeInForm={recipeInForm} />} />
        <Route path="/recipes/:id/edit" element={ 
          <RecipeEdit 
                    getRecipe={handleRecipeEdit}
                    onFormChange={handleFormChange}
                    onFormSubmit={handleFormSubmit} 
                    recipe={recipeInEdit}/>} />
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