import {apiONG} from "../apiONG";

export const getOrganizationInfo = async () => {
    const response = await apiONG.get("/organization");
    return response.data.data;
}