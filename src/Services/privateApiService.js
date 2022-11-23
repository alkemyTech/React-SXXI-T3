import axios from "axios";

export const privateApiONG = axios.create({
  baseURL: `https://ongapi.alkemy.org/api`,
});

const STORAGE = window.localStorage

export function logOut() {
  STORAGE.removeItem('token');
  delete privateApiONG.defaults.headers.common['Authorization']
}

export function obtenerToken() {
  return STORAGE.getItem('token');
}

export function isLogged() {
  return STORAGE.getItem('token') !== null;
}

export function logIn(token) {
  const authToken = `Bearer ${token}`
  STORAGE.setItem('token', authToken);
  privateApiONG.defaults.headers.common['Authorization'] = authToken;
}

