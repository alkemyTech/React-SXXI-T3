import {apiMember} from "./apiService";
import {errorAlert, infoAlert} from "../Components/Feedback/AlertService";


export const onSubmitService = (id, data, resetForm, setSubmitting) => {
  if (id) {
    apiMember
      .put(`${id}`, data)
      .then((response) => {
        infoAlert();
      })
      .catch((error) => {
        errorAlert();
      });
  } else {
    apiMember
      .post(data)
      .then((response) => {
        infoAlert();
        return resetForm();
      })
      .catch((error) => {
        errorAlert();
      });
  }
};
