import axios from "axios";

const apiUrl = process.env.REACT_APP_API_ENDPOINT;
const apiEndpoint = apiUrl + "/users";

export function register(user) {
  axios.post(apiEndpoint + "/register", {
    email: user.email,
    password: user.password,
    country: user.country,
    city: user.city,
  });
}

export function login(user) {
  return axios.post(apiEndpoint + "/login", {
    email: user.email,
    password: user.password,
  });
}

export function activate(token) {
  axios.get(apiEndpoint + `/activate/${token}`);
}
