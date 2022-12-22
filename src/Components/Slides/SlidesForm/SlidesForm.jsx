import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import { onSubmitService } from "../../../Services/slideService";
import { apiONG } from "../../../Services/apiONG";
import {
  createValidationSchema,
  editValidationSchema,
  initialValues,
} from "./constants";
import { BackButton, CKEditorField, InputField } from "../../Form";
import Button from "../../Button/Button";
import { defaultImage } from "../../../utils/defaultImage";

import "../../FormStyles.css";
import { getBase64 } from "../../../utils/getBase64";
import { errorAlert } from "../../Feedback/AlertService";

const SlidesForm = () => {
  const { id } = useParams();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [isFetching, setIsFetching] = useState(false);
  const validationSchema = id ? editValidationSchema : createValidationSchema;

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    if (file) {
      getBase64(file)
        .then((result) => {
          onSubmitService(
            id,
            {
              name: values.name,
              description: values.description,
              order: values.order,
              image: result,
            },
            resetForm,
            setSubmitting
          );
        })
        .catch(({ message }) => {
          setSubmitting(false);
          errorAlert("Error al procesar la imagen");
        })
        .finally(() => setImagePreview(defaultImage));
    } else {
      onSubmitService(
        id,
        {
          name: values.name,
          description: values.description,
          order: values.order,
        },
        resetForm,
        setSubmitting
      );
    }
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
      setIsFetching(() => true);
      apiONG
        .get(`/slides/${id}`)
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

  const handleImageChange = (event) => {
    handleChange(event);
    const file = event.target.files[0];
    if (file.type.includes("image")) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isLoading = isSubmitting || isFetching;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">
          <BackButton />
          {id ? "Editar" : "Crear"} Diapositiva
        </h1>
        <div className="input-preview-image">
          <InputField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese el nombre de la slide"
            errors={errors.name}
            touched={touched.name}
          />
          <img src={imagePreview} alt="preview" className="preview-container" />
        </div>
        <CKEditorField
          placeholder="Ingrese la descripción de la slide"
          value={values.description}
          errors={errors.description}
          touched={touched.description}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          name="description"
          label="Descripción"
        />
        <InputField
          label="Número de orden"
          name="order"
          value={values.order}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ingrese el número de orden de la slide"
          errors={errors.order}
          touched={touched.order}
        />
        <InputField
          label={id ? "Modificar imagen" : "Cargar imagen"}
          name="image"
          value={values.image}
          onChange={handleImageChange}
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

export default SlidesForm;
