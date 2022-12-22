import { apiTestimonials } from "./apiService";
import { errorAlert, infoAlert } from "../Components/Feedback/AlertService";

export const onSubmitService = (id, data, resetForm, setSubmitting) => {
  if (id) {
    apiTestimonials
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
    apiTestimonials
      .post(data)
      .then((response) => {
        infoAlert();
        return resetForm();
      })
      .catch((error) => {
        errorAlert();
      })
      .finally(() => {
        setSubmitting(false);
      });
  }
};
