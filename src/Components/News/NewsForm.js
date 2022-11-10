import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { apiONG } from "../../Services/apiONG";
import "../FormStyles.css";

const updateNew = (oneNew) => {
  apiONG
    .put(`/news/${oneNew.id}`, oneNew)
    .then((response) => {
      Swal.fire("OK", "Novedad guardada correctamente!", "success");
    })
    .catch((err) => {
      Swal.fire("Oops!", err.response?.data?.message, "error");
    });
};

const createNew = (oneNew) => {
  apiONG
    .post("/news", oneNew)
    .then((response) => {
      Swal.fire("OK", "Novedad creada correctamente!", "success");
    })
    .catch((err) => {
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

const NewsForm = () => {
  const [oneNew, setOneNew] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const imageRef = useRef();

  const initialValues = {
    name: "",
    category_id: "",
    content: "",
    image: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "El título debe tener como mínimo 4 letras")
      .required("El título es obligatorio"),
    image: yup
      .string()
      .matches(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/, {
        message: "Formato inválido (sólo se aceptan archivos jpg/png)",
        excludeEmptyString: true,
      })
      .required("La imagen es obligatoria"),
    content: yup.string().required("El contenido es obligatorio"),
    category_id: yup.string().required("La categoría es obligatoria"),
  });

  const onSubmit = ({ name, image, content, category_id }) => {
    const file = imageRef.current.files[0];
    getBase64(file)
      .then((result) => {
        let oneNewToSave = {
          id: oneNew?.id || null,
          name,
          content,
          image: result,
          category_id,
        };
        if(isEdit) updateNew(oneNewToSave)
        else createNew(oneNewToSave);
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
    let options = [];
    setIsFetching(true);
    apiONG.get(`/categories`).then(({ data: { data } }) => {
      data.map((x) => (options = [...options, { value: parseInt(x.id) , label: x.name }]));
      setCategories(options);
      if (id) {
        apiONG
          .get(`/news/${id}`)
          .then(({ data: { data } }) => {
            setValues(() => ({ ...data, image: "" }));
            setOneNew(data);
          })
          .catch((error) => {
            const errorMessage =
              error?.response?.data?.message || error.message;
            Swal.fire({
              title: errorMessage,
              icon: "error",
              timer: 5000,
            });
          });
          setIsEdit(true);
      }
    });
    setIsFetching(false);
  }, [id, setValues]);

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">
          {id ? "Edición" : "Creación"} de Novedades
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
          <label htmlFor="category_id">Categoría</label>
        
          <select
            name="category_id"
            className="form-select"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.category_id}
          >
            {categories.map((x) => {
              return (
                <option value={x.value} key={x.value} >
                  {x.label}
                </option>
              );
            })}
          </select>
          {errors.category_id && touched.category_id && (
            <div className="form-error">{errors.category_id}</div>
          )}
        </div>
        <div className="input-label-container">
          <label>Contenido</label>
          <CKEditor
            editor={ClassicEditor}
            data={values.content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue("content", data);
            }}
            onBlur={(event, editor) => {
              setFieldTouched("content");
            }}
          />
          {errors.content && touched.content && (
            <div className="form-error">{errors.content}</div>
          )}
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

export default NewsForm;
