import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

import { put, post } from "../../../Services/userService";

import { InputField, SelectField } from "../../Form";
import Button from "../../Button/Button";
import { initialValues, validationSchema } from "./constants";

import "../../FormStyles.css";
import { apiUser } from "../../../Services/apiService";
import { errorAlert } from "../../Feedback/AlertService";

const UsersForm = () => {
  const { id } = useParams();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const roleOptions = [
    { label: "Administrador", value: "1" },
    { label: "Regular", value: "2" },
  ];
  const onSubmit = () => {
    const file = imageRef.current.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function () {
      setImagePreview(fileReader.result);

      if (id) {
        put(
          id,
          values.name,
          values.email,
          values.password,
          fileReader.result,
          values.role,
          resetForm,
          setSubmitting
        );
      } else {
        post(
          values.name,
          values.email,
          values.password,
          fileReader.result,
          values.role,
          resetForm,
          setSubmitting
        );
      }
    };

    fileReader.onerror = () => {
      setSubmitting(false);
      Swal.fire({
        title: "Error al procesar la imagen",
        icon: "error",
        timer: 5000,
      });
    };

    fileReader.readAsDataURL(file);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
    isSubmitting,
    setSubmitting,
    resetForm,
    values,
    touched,
    errors,
  } = formik;

  useEffect(() => {
    if (id) {
      setIsFetching(() => true);
      apiUser
        .getSingle(`${id}`)
        .then(response => {
          setValues(() => ({ ...response, image: "", role: response.role_id }));
          setImagePreview(() => response.profile_image);
          setIsFetching(false);
        })
        .catch((error) => {
          setIsFetching(false);
          errorAlert();
        });
    }
  }, [id, setValues]);

  const isLoading = isSubmitting || isFetching;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">
          Formulario de {id ? "Edición" : "Creación"} de Usuario
        </h1>
        <InputField
          label="Nombre"
          value={values.name}
          name="name"
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          errors={errors.name}
          touched={touched.name}
          type="text"
          placeholder="Escriba el nombre del usuario"
        />
        <InputField
          label="Email"
          value={values.email}
          name="email"
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          errors={errors.email}
          touched={touched.email}
          type="text"
          placeholder="Escriba el email del usuario"
        />
        <InputField
          label="Contraseña"
          value={values.password}
          name="password"
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          errors={errors.password}
          touched={touched.password}
          type="password"
          placeholder="Escriba la password del usuario"
        />
        <InputField
          label="Agregar una imagen"
          value={values.image}
          name="image"
          ref={imageRef}
          onChange={handleChange("image")}
          onBlur={handleBlur("image")}
          errors={errors.image}
          touched={touched.image}
          type="file"
        />
        <div className="input-preview-image">
          {id ? (
            <div
              className="preview-container"
              style={{ backgroundImage: `url(${imagePreview})` }}
            ></div>
          ) : null}
        </div>
        <SelectField
          label="Selecciona un rol"
          value={values.role}
          name="role"
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.role}
          touched={touched.role}
          optionsList={roleOptions}
        />
        <Button
          label="Enviar"
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="form-button"
        />
      </form>
    </div>
  );
};

export default UsersForm;
