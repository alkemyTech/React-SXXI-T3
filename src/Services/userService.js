import { apiUser } from "./apiService";
import { errorAlert, infoAlert } from "../Components/Feedback/AlertService";

export const put = (id, data, resetForm, setSubmitting) => {
  apiUser
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
};

export const post = (data, resetForm, setSubmitting) => {
  apiUser
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
};
