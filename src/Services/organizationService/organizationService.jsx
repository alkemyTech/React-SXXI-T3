import {apiONG} from "../apiONG";

export const getOrganizationWelcomeText = async () => {
    const response = await apiONG.get("/organization");
    return response.data.data.welcome_text;
}
