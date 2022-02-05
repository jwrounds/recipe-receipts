import axios, { AxiosResponse } from "axios";
import { getAuthHeader } from "./authService";

const baseURL = "http://localhost:8080/auth";

const authHeader = {
  headers: getAuthHeader()
}

const getUserProfile = async (email: string): Promise<AxiosResponse> => {
  return await axios.get(`${baseURL}/user/${email}`, authHeader).then(res => res);
}

export {
  getUserProfile
}