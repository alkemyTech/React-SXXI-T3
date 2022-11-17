import {apiONG} from "../apiONG";

export const getNews = async (limit = "") => {
    const response = await apiONG.get('/news?limit=' + limit);
    return response.data.data
}