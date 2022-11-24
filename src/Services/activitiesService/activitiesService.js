import { apiONG } from "../apiONG";

export const getActivities = async (search) => {
    let response;

    if (search) {
        try {
            response = await apiONG.get(`/activities?search=${search}`);
        } catch (error) {
            console.log(error)
        }
    } else {
        response = await apiONG.get('/activities');
    }

    return response.data.data
}