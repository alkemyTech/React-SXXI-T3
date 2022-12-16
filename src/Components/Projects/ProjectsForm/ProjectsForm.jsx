import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { BackButton, CKEditorField, InputField } from "../../Form";
import Button from "../../Button/Button";
import {
  createValidationSchema,
  editValidationSchema,
  initialValues,
} from "./constants";
import { getBase64 } from "../../../utils/getBase64";

import "../../FormStyles.css";
import { defaultImage } from "../../../utils/defaultImage";
import { apiProject } from "../../../Services/apiService";
import { errorAlert, infoAlert } from "../../Feedback/AlertService";

const updateProject = (project, setSubmitting) => {
  apiProject
    .put(`${project.id}`, project)
    .then((response) => {
      infoAlert("OK", "Proyecto guardado correctamente!");
    })
    .catch((err) => {
      errorAlert();
    })
    .finally(() => setSubmitting(false));
};

const createProject = (project, setSubmitting) => {
  apiProject
    .post(project)
    .then((response) => {
      infoAlert("OK", "Proyecto creado correctamente!");
    })
    .catch((err) => {
      errorAlert();
    })
    .finally(() => setSubmitting(false));
};

const ProjectsForm = () => {
  const [project, setProject] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const { id } = useParams();
  const imageRef = useRef();
  const validationSchema = id ? editValidationSchema : createValidationSchema;

  const ISOtoYYYYmmDD = (iso) => {
    if (iso === null) return "";
    let [anio, mes, dia] = iso.slice(0, 10).split("-");
    return `${anio}-${mes}-${dia}`;
  };

  const onSubmit = ({ title, image, description, due_date }) => {
    const file = imageRef.current.files[0];
    if (file) {
      getBase64(file)
        .then((result) => {
          let projectToSave = {
            id: project?.id || null,
            title,
            description,
            image,
            due_date,
          };
          if (isEdit) updateProject(projectToSave, setSubmitting);
          else createProject(projectToSave, setSubmitting);
        })
        .catch(() => {
          errorAlert("Error al procesar la imagen");
        })
        .finally(() => setImagePreview(defaultImage));
    } else {
      updateProject({
        id: project?.id,
        title,
        description,
        due_date,
      }, setSubmitting);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleBlur,
    isSubmitting,
    setSubmitting,
    getFieldProps,
  } = formik;

  useEffect(() => {
    setIsFetching(true);

    if (id) {
      apiProject
        .getSingle(`${id}`)
        .then((response) => {
          setValues(() => ({
            ...response,
            image: "",
            due_date: ISOtoYYYYmmDD(response.due_date),
          }));
          setProject(response);
          setImagePreview(response.image);
        })
        .catch((error) => {
          errorAlert();
        });
      setIsEdit(true);
    }

    setIsFetching(false);
  }, [id, setValues]);

  const handleImageChange = (event) => {
    handleChange(event);
    const file = event.target.files[0];
    if (file.type.includes("image")) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">
          <BackButton />
          {id ? "Editar" : "Crear"} Proyecto
        </h1>
        <div className="input-preview-image">
          <InputField
            label="Título"
            placeholder="Título"
            name="title"
            errors={errors.title}
            touched={touched.title}
            {...getFieldProps("title")}
          />
          <img src={imagePreview} alt="preview" className="preview-container" />
        </div>
        <CKEditorField
          value={values.description}
          placeholder="Ingresa una descripción de este proyecto"
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
          label="Descripción"
          name="description"
          errors={errors.description}
          touched={touched.description}
        />
        <InputField
          label="Imagen"
          name="image"
          errors={errors.image}
          touched={touched.image}
          type="file"
          ref={imageRef}
          onChange={handleImageChange}
          onBlur={handleBlur}
        />
        <InputField
          label="Fecha de Finalización"
          placeholder=""
          name="due_date"
          errors={errors.due_date}
          touched={touched.due_date}
          type="date"
          {...getFieldProps("due_date")}
        />
        <Button
          label="Enviar"
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ProjectsForm;
