import {apiUser} from "./apiService";
import {errorAlert, infoAlert} from "../Components/Feedback/AlertService";

export const put = (
  id,
  name,
  email,
  password,
  profilePhoto,
  role,
  resetForm,
  setSubmitting
) => {
  const body = {
    name: name,
    email: email,
    password: password,
    profile_image: profilePhoto,
    role_id: role,
  };
  apiUser
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
};

export const post = (
  name,
  email,
  password,
  profilePhoto,
  role,
  resetForm,
  setSubmitting
) => {
  apiUser
    .post({
      name: name,
      email: email,
      password: password,
      profile_image: profilePhoto,
      role_id: role,
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
};
