import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";

import { onSubmitService } from "../../../Services/categoryFormServices";
import { CKEditorField, InputField } from "../../Form";
import Button from "../../Button/Button";
import { apiONG } from "../../../Services/apiONG";
import { getBase64 } from "../../../utils/getBase64";
import {
  createValidationSchema,
  editValidationSchema,
  initialValues,
} from "./constants";
import { defaultImage } from "../../../utils/defaultImage";

import "../../FormStyles.css";

const CategoriesForm = () => {
  const { id } = useParams();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [isFetching, setIsFetching] = useState(false);
  const validationSchema = id ? editValidationSchema : createValidationSchema;

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    getBase64(file)
      .then((result) => {
        setImagePreview(() => result);
        onSubmitService(
          id,
          formik.values.name,
          formik.values.description,
          result,
          resetForm,
          setSubmitting
        );
      })
      .catch(({ message }) => {
        setSubmitting(false);
        Swal.fire({
          title: message,
          icon: "error",
          timer: 5000,
        });
      });
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
    setFieldValue,
    setFieldTouched,
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
      apiONG
        .get(`/categories/${id}`)
        .then(({ data: { data } }) => {
          setValues(() => ({ ...data, image: "" }));
          setImagePreview(() => data.image);
          setIsFetching(() => false);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.message || error.message;
          setIsFetching(() => false);
          Swal.fire({
            title: errorMessage,
            icon: "error",
            timer: 5000,
          });
        });
    }
  }, [id, setValues]);

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">{id ? "Editar" : "Crear"} Categoría</h1>
        <div className="input-preview-image">
          <InputField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese el nombre de la categoria"
            errors={errors.name}
            touched={touched.name}
          />
          <img src={imagePreview} alt="preview" className="preview-container" />
        </div>
        <CKEditorField
          placeholder="Ingrese la descripción de la categoría"
          value={values.description}
          errors={errors.description}
          touched={touched.description}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          name="description"
          label="Descripción"
        />
        <InputField
          label={id ? "Modificar imagen" : "Cargar imagen"}
          name="image"
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.image}
          touched={touched.image}
          type="file"
          ref={imageRef}
        />
        <Button
          type="submit"
          label="Enviar"
          variant="primary"
          className="form-button"
        />
      </form>
    </div>
  );
};

export default CategoriesForm;
