import axios from "axios";

export const publicApiONG = axios.create({
  baseURL: `https://ongapi.alkemy.org/api`,
});
