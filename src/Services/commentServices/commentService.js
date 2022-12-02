import { apiONG } from "../apiONG";

export const getComments = async () => {
  const response = await apiONG.get("/comments");
  return response.data.data;
};
export const getCommentsPatch = async (id) => {
  const response = await apiONG.get(`/comments/${id}`);
  return response.data.data;
};

