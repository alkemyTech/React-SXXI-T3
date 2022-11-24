import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";

import { apiONG } from "../../../Services/apiONG";
import { InputField, CKEditorField } from "../../Form";
import Button from "../../Button/Button";
import { initialValues, validationSchema } from "./constants";
import { getBase64 } from "../../../utils/getBase64";

import "../../FormStyles.css";

const updateProject = (project) => {
  apiONG
    .put(`/projects/${project.id}`, project)
    .then((response) => {
      Swal.fire("OK", "Proyecto guardado correctamente!", "success");
    })
    .catch((err) => {
      console.error(err);
      Swal.fire("Oops!", err.response?.data?.message, "error");
    });
};

const createProject = (project) => {
  apiONG
    .post("/projects", project)
    .then((response) => {
      Swal.fire("OK", "Proyecto creado correctamente!", "success");
    })
    .catch((err) => {
      console.error(err);
      Swal.fire("Oops!", err.response?.data?.message, "error");
    });
};

const ProjectsForm = () => {
  const [project, setProject] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const imageRef = useRef();

  const ISOtoYYYYmmDD = (iso) => {
    if (iso === null) return "";
    let [anio, mes, dia] = iso.slice(0, 10).split("-");
    return `${anio}-${mes}-${dia}`;
  };

  const onSubmit = ({ title, image, description, due_date }) => {
    const file = imageRef.current.files[0];
    getBase64(file)
      .then((result) => {
        let projectToSave = {
          id: project?.id || null,
          title,
          description,
          image,
          due_date,
        };
        if (isEdit) updateProject(projectToSave);
        else createProject(projectToSave);
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
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
    setFieldTouched,
    setFieldValue,
    isSubmitting,
    setSubmitting,
    getFieldProps,
  } = formik;

  useEffect(() => {
    setIsFetching(true);

    if (id) {
      apiONG
        .get(`/projects/${id}`)
        .then(({ data: { data } }) => {
          setValues(() => ({
            ...data,
            image: "",
            due_date: ISOtoYYYYmmDD(data.due_date),
          }));
          setProject(data);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.message || error.message;
          Swal.fire({
            title: errorMessage,
            icon: "error",
            timer: 5000,
          });
        });
      setIsEdit(true);
    }

    setIsFetching(false);
  }, [id, setValues]);

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">{id ? "Editar" : "Crear"} Proyecto</h1>
        <InputField
          label="Título"
          placeholder="Título"
          name="title"
          errors={errors.title}
          touched={touched.title}
          {...getFieldProps("title")}
        />
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
          {...getFieldProps("image")}
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
