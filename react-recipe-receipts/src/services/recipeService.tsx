import axios, { AxiosResponse } from "axios";
import { RecipeModel } from "../models/RecipeModel";
import { getAuthHeader } from "./authService";

const baseURL = "http://localhost:8080/api/recipe";

const authHeader = {
  headers: getAuthHeader()
}

const loadAllRecipes = async (): Promise<RecipeModel[]> => {
  return await axios.get(baseURL).then(({ data }) => data);
}

const loadRecipe = async (id: string): Promise<RecipeModel> => {
  return await axios.get(`${baseURL}/view/${id}`).then(({ data }) => data);
}

const addRecipe = async (recipe: RecipeModel): Promise<AxiosResponse> => {
  return await axios.post(`${baseURL}/add`, recipe, authHeader).then((res) => res);
}

const updateRecipe = async (recipe: RecipeModel): Promise<AxiosResponse> => {
  return await axios.put(baseURL, recipe, authHeader).then((res) => res);
}

const deleteRecipe = async (id: string): Promise<AxiosResponse> => {
  return await axios.delete(`${baseURL}/${id}`, authHeader).then((res) => res);
}

export {
  loadAllRecipes,
  loadRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe
}