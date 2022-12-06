import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createValidationSchema,
  editValidationSchema,
  initialValues,
} from "./constants";
import "../../FormStyles.css";
import { BackButton, CKEditorField, InputField, SelectField } from "../../Form";
import Button from "../../Button/Button";
import { getBase64 } from "../../../utils/getBase64";
import { defaultImage } from "../../../utils/defaultImage";
import { apiNews } from "../../../Services/apiService";
import { errorAlert, infoAlert } from "../../Feedback/AlertService";

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

const NewsForm = () => {
  const [oneNew, setOneNew] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const imageRef = useRef();
  const validationSchema = id ? editValidationSchema : createValidationSchema;

  const onSubmit = ({ name, content, category_id }) => {
    const file = imageRef.current.files[0];
    if (file) {
      getBase64(file)
        .then((result) => {
          let oneNewToSave = {
            id: oneNew?.id || null,
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
        .finally(() => setImagePreview(defaultImage));
    } else {
      updateNew({
        id: oneNew?.id,
        name,
        content,
        category_id,
      });
    }
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
    apiNews.getAll().then((response) => {
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
            setImagePreview(response.image);
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
          {id ? "Editar" : "Crear"} Novedad
        </h1>
        <div className="input-preview-image">
          <InputField
            label="Título"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese el título de la novedad"
            errors={errors.name}
            touched={touched.name}
          />
          <img src={imagePreview} alt="preview" className="preview-container" />
        </div>
        <SelectField
          label="Categoría"
          value={values.category_id}
          name="category_id"
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.category_id}
          touched={touched.category_id}
          optionsList={categories}
        />
        <CKEditorField
          placeholder="Ingrese el contenido de la novedad"
          value={values.content}
          errors={errors.content}
          touched={touched.content}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          name="content"
          label="Contenido"
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

export default NewsForm;
