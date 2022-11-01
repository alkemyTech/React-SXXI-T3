import axios from "axios";

export const apiONG = axios.create({
    baseURL: `https://ongapi.alkemy.org/api`
})