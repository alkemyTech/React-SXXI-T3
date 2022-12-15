import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";

import { getBase64 } from "../../../utils/getBase64";
import { useState } from "react";
import { initialValues, validationSchema } from "./constants";
import Button from "../../Button/Button";
import { CKEditorField, InputField, TextAreaField } from "../../Form";
import { defaultImage } from "../../../utils/defaultImage";

import styles from "./organizationForm.module.css";
import { apiOrganization } from "../../../Services/apiService";
import { errorAlert, infoAlert } from "../../Feedback/AlertService";

const OrganizationForm = () => {
  const imageRef = useRef();

  const [isFetching, setIsFetching] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultImage);

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    setTimeout(() => {
      getBase64(file)
        .then((result) => {
          setSubmitting(false);
          setIsFetching(() => false);
          setImagePreview(() => result);
        })
        .then(() => {
          infoAlert({title:"Organizacion Actualizada"});
        });
    }, 2000);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    setFieldTouched,
    setSubmitting,
    isSubmitting,
    values,
    errors,
    touched,
      isValid
  } = formik;

  useEffect(() => {
    setIsFetching(() => true);
    apiOrganization
      .getAll()
      .then(response => {
        setIsFetching(() => false);
        setImagePreview(() => response.logo);
        setValues(() => ({ ...response, logo: "" }));
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error.message;
        setIsFetching(() => false);
        errorAlert(errorMessage);
      });
  }, [setValues]);

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit} data-testid="form">
        <h1 className="form-title">Editar datos de la Organización</h1>
        <div className="input-preview-image">
          <InputField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese el nombre de la organización"
            errors={errors.name}
            touched={touched.name}
            data-testid="nameInput"
          />
          <img src={imagePreview} alt="preview" className="preview-container" />
        </div>
        <InputField
          label="Facebook"
          name="facebook_url"
          value={values.facebook_url}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://www.facebook.com/..."
          errors={errors.facebook_url}
          touched={touched.facebook_url}
          data-testid="facebookInput"
        />
        <InputField
          label="Linkedin"
          name="linkedin_url"
          value={values.linkedin_url}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://www.linkedin.com/..."
          errors={errors.linkedin_url}
          touched={touched.linkedin_url}
          data-testid="linkedinInput"
        />
        <InputField
          label="Instagram"
          name="instagram_url"
          value={values.instagram_url}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://www.instagram.com/..."
          errors={errors.instagram_url}
          touched={touched.instagram_url}
          data-testid="instagramInput"
        />
        <InputField
          label="Twitter"
          name="twitter_url"
          value={values.twitter_url}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://www.twitter.com/..."
          errors={errors.twitter_url}
          touched={touched.twitter_url}
          data-testid="twitterInput"
        />
        <TextAreaField
            name="short_description"
            value={values.short_description}
            touched={touched.short_description}
            onBlur={handleBlur("short_description")}
            onChange={handleChange("short_description")}
            errors={errors.long_description}
            label="Descripción resumida"
            inputClassName={styles.input_textArea}
            data-testid="shortDescInput"
        />
        <TextAreaField
          name="long_description"
          value={values.long_description}
          touched={touched.long_description}
          onBlur={handleBlur("long_description")}
          onChange={handleChange("long_description")}
          errors={errors.long_description}
          label="Descripción completa"
          inputClassName={styles.input_textArea}
          data-testid="longDescInput"
        />
        <InputField
          label="Modificar logo"
          name="image"
          value={values.logo}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.logo}
          touched={touched.logo}
          type="file"
          ref={imageRef}
          data-testid="imgInput"
        />
        <Button
          disabled={!isValid}
          type={"submit"}
          label="Enviar"
          variant="primary"
          data-testid="submitButton"
        />
      </form>
    </div>
  );
};

export default OrganizationForm;
