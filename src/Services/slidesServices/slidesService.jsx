import {apiONG} from "../apiONG";

export const getSlides = async () => {
    const response = await apiONG.get("/slides");
    return response.data.data;
}