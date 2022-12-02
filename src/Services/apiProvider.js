import Swal from "sweetalert2";
import { apiONG } from "./apiONG";

const handleResponse = (response) => {
    return response.data.data;
};

const handleError = (error) => {
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    throw error
};

const getAll = (resource, query) => {
    return apiONG.get(`/${resource}?${query}`)
};

const getSingle = (resource, id) => {
    return apiONG
    .get(`/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError)
};

const post = (resource, model) => {
    return apiONG
    .post(`/${resource}`, model)
    .then(handleResponse)
    .catch(handleError)
};

const put = (resource, id, model) => {
    return apiONG
    .get(`/${resource}/${id}`, model)
    .then(handleResponse)
    .catch(handleError)
};

const patch = (resource, id, model) => {
    return apiONG
    .get(`/${resource}/${id}`, model)
    .then(handleResponse)
    .catch(handleError)
};

const remove = (resource, id) => {
    return apiONG
    .delete(`/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError)
};

export const apiProvider = {
    getAll,
    getSingle,
    post,
    put,
    patch,
    remove
};