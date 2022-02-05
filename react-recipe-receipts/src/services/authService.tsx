import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

  const baseURL = "http://localhost:8080/api";

  type UserData = {
      token: string;
      id: string;
      username: string;
      email: string;
      roles: string[];
  };
  
  type User = {
    data: UserData | null;
  }

  const currentUser: User = {
    data: null
  };

  const login = async (username: string, password: string): Promise<void> => {
    return axios.post(baseURL + "/auth/login", {
      username,
      password
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        currentUser.data = response.data;
        
      }
    });
  }

  const logout = () => {
    currentUser.data = null;
  }

  const register = (username: string, email: string, password: string): Promise<AxiosResponse<any>> => {
    return axios.post(baseURL + "/auth/signup", {
      username,
      email,
      password
    });
  }

  const getCurrentUser = (): UserData | null => {
    return currentUser.data;
  }

  const getAuthHeader = (): AxiosRequestHeaders => {
    if (currentUser.data && currentUser.data.token) {
      return { Authorization: `Bearer ${currentUser.data.token}`};
    } else {
      return {};
    }
  }

  export {
    login,
    logout,
    register,
    getCurrentUser,
    getAuthHeader
  }
