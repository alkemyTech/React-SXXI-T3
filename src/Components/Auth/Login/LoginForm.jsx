import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import {
  loginInitialValues as initialValues,
  loginValidationSchema as validationSchema,
} from "../constants";
import { InputField } from "../../Form";
import Button from "../../Button/Button";

const LoginForm = ({ desktop }) => {

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
          <div className="row">
            <span className="auth-title">Bienvenido</span>
            <span className="auth-subtitle">Inicia sesión en tu cuenta!</span>
          </div>
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
        <Button type="submit" label="Iniciar sesión" variant="primary" className="form-button"/>
        <div className="auth-suggestion">
          No tienes una cuenta?
          <Link className="auth-link" to={"/register"}>
            Regístrate
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
