import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://miolaproject.herokuapp.com/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "users");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
