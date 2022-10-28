import axios from "axios";

export const apiBaseURL = axios.create({
    baseURL: `https://ongapi.alkemy.org/api`
})