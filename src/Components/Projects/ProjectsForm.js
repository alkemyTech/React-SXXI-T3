import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as yup from "yup";
import { apiONG } from "../../Services/apiONG";
import "../FormStyles.css";
import { InputField } from "../Form/InputField";
import { CKEditorField } from "../Form/CKEditorField";
import Button from "../Button/Button";

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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
    reader.onerror = () => {
      reject({
        message: "Ocurrió un error mientras se procesaba la imagen",
      });
    };
    reader.readAsDataURL(file);
  });

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

  const initialValues = {
    title: "",
    description: "",
    image: "",
    due_date: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("El título es obligatorio"),
    image: yup
      .string()
      .matches(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/, {
        message: "Formato inválido (sólo se aceptan archivos jpg/png)",
        excludeEmptyString: true,
      })
      .required("La imagen es obligatoria"),
    description: yup.string().required("La descripción es obligatoria"),
    due_date: yup.string(),
  });

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
    errors: {
      title: errorTitle,
      description: errorDescription,
      image: errorImage,
      due_date: errorDate,
    },
    touched: {
      title: touchedTitle,
      description: touchedDescription,
      image: touchedImage,
      due_date: touchedDate,
    },
    values: {description},
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
        <h1 className="form-title">
          {id ? "Edición" : "Creación"} de Proyectos
        </h1>

        <InputField
          label="Título"
          placeholder="Título"
          name="title"
          errors={errorTitle}
          touched={touchedTitle}
          {...getFieldProps("title")}
        />

        <CKEditorField
          value={description}
          placeholder="Ingresa una descripción de este proyecto"
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
          label="Descripción"
          name="description"
          errors={errorDescription}
          touched={touchedDescription}
        />

        <InputField
          label="Imagen"
          placeholder="Carga una imagen"
          name="image"
          errors={errorImage}
          touched={touchedImage}
          type="file"
          ref={imageRef}
          {...getFieldProps("image")}
        />

        <InputField
          label="Fecha de Finalización"
          placeholder=""
          name="due_date"
          errors={errorDate}
          touched={touchedDate}
          type="date"
          {...getFieldProps("due_date")}
        />

        <Button label="Enviar" type="submit" variant="primary" disabled={isSubmitting} />
      </form>
    </div>
  );
};

export default ProjectsForm;
