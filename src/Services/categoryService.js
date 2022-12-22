import { apiCategory } from "./apiService";
import { errorAlert, infoAlert } from "../Components/Feedback/AlertService";

export const onSubmitService = (id, data, resetForm, setSubmitting) => {
  if (id) {
    apiCategory
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
    apiCategory
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
