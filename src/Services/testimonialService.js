import { apiTestimonials } from "./apiService";
import { errorAlert, infoAlert } from "../Components/Feedback/AlertService";

export const onSubmitService = (
  id,
  name,
  description,
  imageBase64,
  resetForm,
  setSubmitting
) => {
  const body = {
    name: name,
    description: description,
    image: imageBase64,
  };
  if (id) {
    apiTestimonials
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
    apiTestimonials
      .post(body)
      .then((response) => {
        infoAlert();
        return resetForm();
      })
      .catch((error) => {
        errorAlert()
      })
      .finally(() => {
        setSubmitting(false);
      });
  }
};
