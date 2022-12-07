import { apiSlide } from "./apiService";
import { errorAlert, infoAlert } from "../Components/Feedback/AlertService";

export const onSubmitService = (
  id,
  name,
  description,
  imageBase64,
  order,
  resetForm,
  setSubmitting
) => {
  const body = {
    name: name,
    description: description,
    image: imageBase64,
    order: order,
  };

  if (id) {
    apiSlide
      .put(`${id}`, body)
      .then((response) => {
        infoAlert();
      })
      .catch((error) => {
        errorAlert();
      })
      .finally(() => {
        setSubmitting(false);
      });
  } else {
    apiSlide
      .post(body)
      .then((response) => {
        infoAlert();
      })
      .catch((error) => {
        errorAlert();
      })
      .finally(() => {
        setSubmitting(false);
      });
  }
};
