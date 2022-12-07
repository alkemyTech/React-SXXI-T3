import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getBase64 } from "../../../utils/getBase64";
import { CKEditorField, InputField } from "../../Form";
import Button from "../../Button/Button";
import { initialValues, validationSchema } from "./constants";

import "../../FormStyles.css";
import { apiActivity } from "../../../Services/apiService";
import { errorAlert, infoAlert } from "../../Feedback/AlertService";

const updateActivity = (activity) => {
  apiActivity
    .put(`${activity.id}`, activity)
    .then((response) => {
      infoAlert();
    })
    .catch((err) => {
      errorAlert();
    });
};

const createActivity = (activity) => {
  apiActivity
    .post(activity)
    .then((response) => {
      infoAlert();
    })
    .catch((err) => {
      errorAlert();
    });
};

const ActivitiesForm = () => {
  const [activity, setActivity] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
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
        errorAlert("Error en cargar la imagen");
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
      apiActivity
        .getSingle(`${id}`)
        .then((response) => {
          setValues(() => ({ ...response, image: "" }));
          setActivity(response);
        })
        .catch((error) => {
          errorAlert();
        });
      setIsFetching(false);
      setIsEdit(true);
    }
  }, [id, setValues]);

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">{id ? "Editar" : "Crear"} Actividad</h1>
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
