import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { apiONG } from "../../Services/apiONG";
import "../FormStyles.css";

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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
    reader.onerror = () => {
      reject({
        message: "Ocurrió un error mientras se procesaba la imagen",
      });
    };
  });

const ActivitiesForm = () => {
  const [activity, setActivity] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const imageRef = useRef();
  const initialValues = {
    name: "",
    image: "",
    description: "Ingresa un texto... (opcional)",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("El título es obligatorio"),
    image: yup
      .string()
      .matches(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/, {
        message: "Formato inválido (sólo se aceptan archivos jpg/png)",
        excludeEmptyString: true,
      })
      .required("La imagen es obligatoria"),
    description: yup.string(),
  });

  const onSubmit = ({ name, image, description }) => {
    const file = imageRef.current.files[0];
    getBase64(file)
      .then((result) => {
        let activityToSave = {
          id: activity?.id || null,
          name,
          description,
          image: result,
        };
        if(isEdit) updateActivity(activityToSave)
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
          {id ? "Edición" : "Creación"} de Actividades
        </h1>
        <div className="input-label-container">
          <label htmlFor="name">Título</label>
          <input
            className="input-field"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Título"
            autoComplete="off"
          ></input>
          {errors.name && touched.name && (
            <div className="form-error">{errors.name}</div>
          )}
        </div>

        <div className="input-label-container">
          <label>Descripción</label>
          <CKEditor
            editor={ClassicEditor}
            data={values.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
            onBlur={(event, editor) => {
              setFieldTouched("description");
            }}
          />
        </div>

        <div className="input-label-container">
          <label htmlFor="image">
            {id ? "Modificar imagen" : "Cargar imagen"}
          </label>
          <input
            className="input-field"
            ref={imageRef}
            type="file"
            name="image"
            onChange={(e) => setFieldValue("image", e.target.value)}
            onBlur={(e) => setFieldTouched("image")}
            autoComplete="off"
          ></input>
          {errors.image && touched.image && (
            <div className="form-error">{errors.image}</div>
          )}
        </div>
        <button className="submit-btn" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ActivitiesForm;
