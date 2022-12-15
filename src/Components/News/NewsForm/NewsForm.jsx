import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { initialValues, validationSchemaEdit, validationSchemaCreate } from "./constants";
import "../../FormStyles.css";
import {CKEditorField, InputField, SelectField, TextAreaField} from "../../Form";
import Button from "../../Button/Button";
import { apiNews } from "../../../Services/apiService";
import { errorAlert, infoAlert } from "../../Feedback/AlertService";
import styles from "../../Organization/OrganizationForm/organizationForm.module.css";

const updateNew = (oneNew) => {
  apiNews
    .put(`${oneNew.id}`, oneNew)
    .then((response) => {
      infoAlert("OK", "Novedad guardada correctamente!");
    })
    .catch((err) => {
      errorAlert();
    });
};

const createNew = (oneNew) => {
  apiNews
    .post(oneNew)
    .then((response) => {
      infoAlert("OK", "Novedad creada correctamente!");
    })
    .catch((err) => {
      errorAlert();
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
  const validationSchema = id ? validationSchemaEdit : validationSchemaCreate;

  const onSubmit = ({ name, image, content, category_id }) => {
    const file = imageRef.current.files[0];
    if (file) {
      getBase64(file)
          .then((result) => {
            let oneNewToSave = {
              id: id || null,
              name,
              content,
              image: result,
              category_id,
            };
            if (isEdit) {
              updateNew(oneNewToSave);
            } else {
              createNew(oneNewToSave);
            }
          })
    } else {
      updateNew({
        id: id,
        name,
        content,
        category_id,
      });
    }
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
    isValid
  } = formik;

  useEffect(() => {
    let options = [];
    setIsFetching(true);
    apiNews
    .getAll()
    .then(response => {
      response.map(
        (x) =>
          (options = [...options, { value: parseInt(x.id), label: x.name }])
      );
      setCategories(options);
      if (id) {
        apiNews
          .getSingle(`${id}`)
          .then((response) => {
            setValues(() => ({ ...response, image: "" }));
            setOneNew(response);
          })
          .catch((error) => {
            errorAlert();
            });
        setIsEdit(true);
      }
    });
    setIsFetching(false);
  }, [id, setValues]);

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit} data-testid="form">
        <h1 className="form-title">{id ? "Editar" : "Crear"} Novedad</h1>
        <InputField
          label="Título"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ingrese el título de la novedad"
          errors={errors.name}
          touched={touched.name}
          data-testid="nameInput"
        />
        <SelectField
          label="Categoría"
          value={values.category_id}
          name="category_id"
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.category_id}
          touched={touched.category_id}
          optionsList={categories}
          data-testid="selectInput"
        />
        <TextAreaField
            placeholder="Ingrese el contenido de la novedad"
            name="content"
            value={values.content}
            touched={touched.content}
            onBlur={handleBlur("content")}
            onChange={handleChange("content")}
            errors={errors.content}
            label="Contenido"
            inputClassName={styles.input_textArea}
            data-testid="contenidoInput"
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
          data-testid="nameInput"
        />
        <Button
          type="submit"
          label="Enviar"
          variant="primary"
          className="form-button"
          data-testid="submitButton"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};

export default NewsForm;
