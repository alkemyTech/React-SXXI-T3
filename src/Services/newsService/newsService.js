import { apiONG } from "../apiONG";

export const getNews = async (search, limit = "") => {
    let response;

    if (search) {
        try {
            response = await apiONG.get(`/news?search=${search}`);
        } catch (error) {
            console.log(error)
        }
    } else {
        response = await apiONG.get('/news?limit=' + limit);
    }

    return response.data.data
}