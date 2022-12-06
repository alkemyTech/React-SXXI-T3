import { apiSlide } from "./apiService";
import { errorAlert, infoAlert } from "../Components/Feedback/AlertService";

export const onSubmitService = (id, data, resetForm, setSubmitting) => {
  if (id) {
    apiSlide
      .put(`${id}`, data)
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
      .post(data)
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
