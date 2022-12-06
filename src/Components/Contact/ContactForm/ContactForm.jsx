import { useState } from "react";
import { useFormik } from "formik";
import { CKEditorField } from "../../Form/CKEditorField";
import Swal from "sweetalert2";

import { initialValues, validationSchema } from "./constants";
import { InputField } from "../../Form/InputField";
import Button from "../../Button/Button";

import "../../FormStyles.css";

const ContactForm = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = () => {
    setIsFetching(() => true);
    setTimeout(() => {
      Swal.fire({
        title: "Campos Validados",
        icon: "success",
        text: "Mas adelante se enviará un email",
      });
      setSubmitting(false);
      setIsFetching(() => false);
    }, 2000);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    handleBlur,
    handleSubmit,
    setSubmitting,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    values,
    touched,
    errors,
  } = formik;

  const isLoading = isFetching || isSubmitting;
  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">Dejanos tu mensaje</h1>
        <InputField
          label="Nombre"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ingrese su nombre"
          errors={errors.name}
          touched={touched.name}
        />
        <InputField
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ingrese su email"
          errors={errors.email}
          touched={touched.email}
        />
        <InputField
          label="Teléfono"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ingrese su teléfono"
          errors={errors.phone}
          touched={touched.phone}
        />
        <CKEditorField
          label="Mensaje"
          name="message"
          value={values.message}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          placeholder="Ingrese su mensaje"
          errors={errors.message}
          touched={touched.message}
        />
        <Button
          type="submit"
          variant="primary"
          label="Enviar"
          disabled={isSubmitting}
          className="form-button"
        />
        {children}
      </form>
    </div>
  );
};

export default ContactForm;
