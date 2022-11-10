import {apiONG} from "../apiONG";

export const getSlides = async () => {
    const response = await apiONG.get("/slides?limit=30");
    return response.data.data;
}

