import {apiCategory} from "./apiService";
import {errorAlert, infoAlert} from "../Components/Feedback/AlertService";


export const onSubmitService = (
  id,
  name,
  description,
  image,
  resetForm,
  setSubmitting
) => {
  if (id) {
    apiCategory
      .put(`${id}`, {
        name,
        description,
        image,
      })
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
      .post({
        name,
        description,
        image,
      })
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
