import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getBase64 } from "../../../utils/getBase64";
import { BackButton, CKEditorField, InputField } from "../../Form";
import Button from "../../Button/Button";
import { apiONG } from "../../../Services/apiONG";
import {
  createValidationSchema,
  editValidationSchema,
  initialValues,
} from "./constants";

import "../../FormStyles.css";
import { defaultImage } from "../../../utils/defaultImage";

const updateActivity = (activity) => {
  apiONG
    .put(`/activities/${activity.id}`, activity)
    .then((response) => {
      Swal.fire("OK", "Actividad guardada correctamente!", "success");
    })
    .catch((err) => {
      Swal.fire("Oops!", err.response?.data?.message, "error");
    });
};

const createActivity = (activity) => {
  apiONG
    .post("/activities", activity)
    .then((response) => {
      Swal.fire("OK", "Actividad creada correctamente!", "success");
    })
    .catch((err) => {
      Swal.fire("Oops!", err.response?.data?.message, "error");
    });
};

const ActivitiesForm = () => {
  const [activity, setActivity] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const { id } = useParams();
  const validationSchema = id ? editValidationSchema : createValidationSchema;
  const imageRef = useRef();

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    getBase64(file)
      .then((result) => {
        let activityToSave = {
          id: activity?.id || null,
          name: values.name,
          description: values.description,
          image: result,
        };
        if (isEdit) updateActivity(activityToSave);
        else createActivity(activityToSave);
      })
      .catch(() => {
        Swal.fire({
          title: "Tuvimos problemas con la carga de la imagen",
          icon: "error",
          timer: 5000,
        });
      });
    setSubmitting(false);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
    setFieldTouched,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = formik;
  useEffect(() => {
    if (id) {
      setIsFetching(true);
      apiONG
        .get(`/activities/${id}`)
        .then(({ data: { data } }) => {
          setValues(() => ({ ...data, image: "" }));
          setImagePreview(() => data.image);
          setActivity(data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.message || error.message;
          Swal.fire({
            title: errorMessage,
            icon: "error",
            timer: 5000,
          });
        });
      setIsFetching(false);
      setIsEdit(true);
    }
  }, [id, setValues]);

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">
          <BackButton />
          {id ? "Editar" : "Crear"} Actividad
        </h1>
        <div className="input-preview-image">
          <InputField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese el nombre de la actividad"
            errors={errors.name}
            touched={touched.name}
          />
          <img src={imagePreview} alt="preview" className="preview-container" />
        </div>
        <CKEditorField
          placeholder="Ingrese la descripción de la actividad"
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

export default ActivitiesForm;
