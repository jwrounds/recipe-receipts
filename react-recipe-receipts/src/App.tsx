import React, { useState, useEffect } from 'react';
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
import { login, logout, register, getCurrentUser } from './services/authService';
import { loadAllRecipes, loadRecipe, addRecipe, updateRecipe, deleteRecipe } from './services/recipeService';
import LoginForm from './components/forms/LoginForm';
import { UserFormData } from './models/UserFormData';
import SignupForm from './components/forms/SignupForm';

const App = (): JSX.Element => {

  const [recipeInForm, setRecipeInForm] = useState<RecipeModel>(new RecipeModel());
  const [recipeInEdit, setRecipeInEdit] = useState<RecipeModel>(new RecipeModel());;
  const [recipeList, setRecipeList] = useState<RecipeModel[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<RecipeModel | null>(null);
  const [loginFormData, setLoginFormData] = useState<UserFormData>(new UserFormData())

  const navigate = useNavigate();
  
  useEffect(() => {
    if (recipeList.length === 0) {
      getRecipeList();
    }
  })

  const getRecipeList = async (): Promise<void> => {
    let data: RecipeModel[] = await loadAllRecipes();
    console.log(data);
    setRecipeList(data);
  }

  const getRecipeById = async (id: string): Promise<void> => {
    let data: RecipeModel = await loadRecipe(id);

    console.log(data);
    setCurrentRecipe(data);
    setRecipeInEdit(data);
  }

  const addNewRecipe = async (recipe: RecipeModel): Promise<void> => {
    console.log(getCurrentUser());
    let response = await addRecipe(recipe);
    if (response.status === 201) {
      navigate("/recipes");
      getRecipeList();
    }
  }

 const updateCurrentRecipe = async (recipe: RecipeModel): Promise<void> => {
    let response = await updateRecipe(recipe);
    if (response.status === 200) {
      getRecipeById(recipe.id);
      getRecipeList();
      navigate(`recipes/${recipe.id}`);
    }

  }

  const deleteRecipeById = async (id: string) => {
    let response = await deleteRecipe(id);
    if (response.status === 204) {
      getRecipeList();
      navigate("/recipes");
    }
  }

  const handleLoginFormChange = (user: UserFormData) => {
    setLoginFormData(user);
  }

  const handleRecipeFormChange = (newRecipe: RecipeModel, formType: string) => {
    if (formType === 'add') {
      setRecipeInForm(newRecipe);
    } else if (formType === 'edit') {
      setRecipeInEdit(newRecipe);
    }
  }

  const handleFormSubmit = (formType: string) => {
    if (formType === 'add') {
      addNewRecipe(recipeInForm).then(
        () => setRecipeInForm(new RecipeModel())
      );
    } else if (formType === 'edit') {
      updateCurrentRecipe(recipeInEdit);
    }
  }

  const handleLogin = () => {
    login(loginFormData.username, loginFormData.password);
    console.log(getCurrentUser());
  }

  const handleSignup = () => {
    register(loginFormData.username, loginFormData.email, loginFormData.password).then(res => console.log(res));
  }

  
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Landing />} />
        <Route path="/recipes" element={
          <RecipeList 
                    list={recipeList}
                   // onRecipeClick={getRecipeById}
                    
                    />}/>
        <Route path="/recipes/:id" element={
          <RecipeContainer                   
                    getRecipeById={getRecipeById}
                    onDelete={deleteRecipeById}
                   // onFormChange={handleFormChange}
                    //onFormSubmit={handleFormSubmit} 
                    recipe={currentRecipe}
                   // recipeInForm={recipeInForm} 
                    />} />
        <Route path="/recipes/:id/edit" element={ 
          <RecipeEdit 
                    getRecipe={getRecipeById}
                    onFormChange={handleRecipeFormChange}
                    onFormSubmit={handleFormSubmit} 
                    recipe={recipeInEdit}/>} />
        <Route path="/add" element={
          <RecipeFormContainer 
                    title="Add Your Recipe"
                    tagline="We know it's going to be great."
                    formId="add"
                    onFormChange={handleRecipeFormChange} 
                    onFormSubmit={handleFormSubmit} 
                    recipe={recipeInForm} />} />
          <Route path="/auth/login" element={
            <LoginForm 
                    user={loginFormData}
                    onUserFormChange={handleLoginFormChange}
                    onLogin={handleLogin}/>
          } />
          <Route path="/auth/signup" element={
            <SignupForm 
                    user={loginFormData}
                    onUserFormChange={handleLoginFormChange}
                    onSignup={handleSignup}/>}
          />
      </Routes>
      <Footer />
    </div> 
  ); 
}

export {
  App,
  UserFormData
}