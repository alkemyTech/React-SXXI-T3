import { apiONG } from "../apiONG";

export const getActivities = async () => {
  const response = await apiONG.get("/activities");
  return response.data.data;
};
