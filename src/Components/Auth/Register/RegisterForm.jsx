import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

import {
  registerInitialValues as initialValues,
  registerValidationSchema as validationSchema,
} from "../constants";
import { InputField } from "../../Form";
import Button from "../../Button/Button";

const RegisterForm = ({ desktop }) => {

  const onSubmit = ({ email, password }) => {
    const user = {
      email,
      password,
    };
    console.log(user);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleChange, handleBlur, handleSubmit, errors, touched, values } =
    formik;

  return (
    <>
      <form className="form-container auth-container" onSubmit={handleSubmit}>
        {desktop && (
          <>
            <div className="auth-title">Bienvenido</div>
            <div className="auth-subtitle">Registra tu nueva cuenta!</div>
          </>
        )}
        <InputField
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Correo electrónico"
            errors={errors.email}
            touched={touched.email}
        />
        <InputField
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Contraseña"
            errors={errors.password}
            touched={touched.password}
        />
        <InputField
            type="password"
            name="confirm"
            value={values.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirmar contraseña"
            errors={errors.confirm}
            touched={touched.confirm}
        />
        <Button type="submit" label="Registrarse" variant="primary" className="form-button"/>
        <div className="auth-suggestion">
          Ya tienes una cuenta?
          <Link className="auth-link" to={"/login"}>
            Inicia sesión
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
