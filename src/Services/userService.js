import { apiONG } from "./apiONG";
import Swal from "sweetalert2";

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
  apiONG
    .put(`/users/${id}`, body)
    .then((response) => {
      const {
        data: { message },
      } = response;
      return Swal.fire({
        title: message,
        icon: "success",
        timer: 3000,
      });
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message || error.message;

      Swal.fire({
        title: errorMessage,
        icon: "error",
        timer: 5000,
      });
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
  apiONG
    .post(`/users`, {
      name: name,
      email: email,
      password: password,
      profile_image: profilePhoto,
      role_id: role,
    })
    .then((response) => {
      const {
        data: { message },
      } = response;
      Swal.fire({
        title: message,
        icon: "success",
        timer: 3000,
      });
      return resetForm();
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message
        ? `Ya existe un usuario con ese nombre`
        : error.message;

      Swal.fire({
        title: errorMessage,
        icon: "error",
        timer: 5000,
      });
    })
    .finally(() => {
      setSubmitting(false);
    });
};
