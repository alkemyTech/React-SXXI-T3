import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";

import { useParams } from "react-router-dom";

import { onSubmitService } from "../../../Services/testimonialService.js";
import { initialValues, validationSchema } from "./constants";
import { CKEditorField, InputField } from "../../Form";
import Button from "../../Button/Button";
import { defaultImage } from "../../../utils/defaultImage";

import "../../FormStyles.css";
import { apiTestimonials } from "../../../Services/apiService.js";
import { errorAlert } from "../../Feedback/AlertService.jsx";

const TestimonialsForm = () => {
  const { id } = useParams();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setImagePreview(fileReader.result);
      onSubmitService(
        id,
        values.name,
        values.description,
        fileReader.result,
        resetForm,
        setSubmitting
      );
    };
    fileReader.onerror = () => {
      setSubmitting(false);
      errorAlert("Error al procesar la imagen");
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
    setFieldValue,
    setFieldTouched,
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
      setIsFetching(true);
      apiTestimonials
        .getSingle(`${id}`)
        .then(response => {
          setValues(() => ({ ...response, image: "" }));
          setImagePreview(() => response.image);
          setIsFetching(() => false);
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
        <h1 className="form-title"> {id ? "Editar" : "Crear"} Testimonio</h1>
        <div className="input-preview-image">
          <InputField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese el nombre del testigo"
            errors={errors.name}
            touched={touched.name}
          />
          <img src={imagePreview} alt="preview" className="preview-container" />
        </div>
        <CKEditorField
          placeholder="Ingrese la descripción de la testimonio"
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

export default TestimonialsForm;
