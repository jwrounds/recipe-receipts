import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/navigation/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/navigation/Navbar';
import RecipeList from './components/content/RecipeList';
import RecipeFormContainer from './components/forms/RecipeFormContainer';
import RecipeContainer from './components/content/RecipeContainer';
import RecipeEdit from './components/forms/RecipeEdit';
import { RecipeModel } from './models/RecipeModel';

const App = (): JSX.Element => { 

  const [recipeInForm, setRecipeInForm] = useState<RecipeModel>(new RecipeModel());
  const [recipeInEdit, setRecipeInEdit] = useState<RecipeModel>(new RecipeModel());;
  const [recipeList, setRecipeList] = useState<RecipeModel[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<RecipeModel | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (recipeList.length === 0) {
      loadRecipes();
    }
  })

  async function loadRecipes(): Promise<void> {
    let data: RecipeModel[] = await axios.get('http://localhost:8080/api/recipe')
      .then(({ data }) => data);
    setRecipeList(data);
  }

  async function loadRecipe(id: string): Promise<void> {
    let data: RecipeModel = await axios.get(`http://localhost:8080/api/recipe/view/${id}`).then(({ data }) => data);
    console.log(data);
    setCurrentRecipe(data);
    setRecipeInEdit(data);
  }

  async function addRecipe(recipe: RecipeModel): Promise<void> {
    let response = await axios.post('http://localhost:8080/api/recipe/add', recipe)
    .then((res) => res);
    if (response.status === 201) {
      navigate("/recipes");
      loadRecipes();
    }
  }

  async function updateRecipe(recipe: RecipeModel): Promise<void> {
    await axios.put('http://localhost:8080/api/recipe', recipe)
    .then((res) => {
      if (res.status === 200) {
        loadRecipe(recipe.id);
        loadRecipes();
        navigate(`recipes/${recipe.id}`);
      }
    });
  }

  async function deleteRecipe(id: string) {
    let response = await axios.delete(`http://localhost:8080/api/recipe/${id}`)
    .then((res) => res);
    if (response.status === 204) {
      loadRecipes();
      navigate("/recipes");
    }
  }


  function handleFormChange(newRecipe: RecipeModel, formType: string) {
    if (formType === 'add') {
      setRecipeInForm(newRecipe);
    } else if (formType === 'edit') {
      setRecipeInEdit(newRecipe);
    }
  }

  function handleFormSubmit(formType: string) {
    if (formType === 'add') {
      addRecipe(recipeInForm).then(
        () => setRecipeInForm(new RecipeModel())
      );
    } else if (formType === 'edit') {
      updateRecipe(recipeInEdit);
    }
  }

  console.log(recipeList);
  
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Landing />} />
        <Route path="/recipes" element={
          <RecipeList 
                    list={recipeList}
                   // onRecipeClick={loadRecipe}
                    
                    />}/>
        <Route path="/recipes/:id" element={
          <RecipeContainer                   
                    getRecipeById={loadRecipe}
                    onDelete={deleteRecipe}
                   // onFormChange={handleFormChange}
                    //onFormSubmit={handleFormSubmit} 
                    recipe={currentRecipe}
                   // recipeInForm={recipeInForm} 
                    />} />
        <Route path="/recipes/:id/edit" element={ 
          <RecipeEdit 
                    getRecipe={loadRecipe}
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
    </div> 
  ); 
}

export default App;