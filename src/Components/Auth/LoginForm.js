import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../FormStyles.css";
import "./Auth.css";

const LoginForm = ({ desktop }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("El email debe tener un formato válido")
      .required("El email es obligatorio"),
    password: yup
      .string()
      .min(6, "La contraseña debe tener una longitud mínima de 6 caracteres")
      .matches(
        /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        "La contraseña debe contener al menos un número, una letra y un símbolo (#?!@$%^&*-)"
      )
      .required("La contraseña es obligatoria"),
  });

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
        <input
          className="input-field auth-input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Correo electrónico"
          autoComplete="off"
        ></input>
        {errors.email && touched.email && (
          <div className="form-error auth-error">{errors.email}</div>
        )}
        <input
          className="input-field auth-input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Contraseña"
          autoComplete="off"
        ></input>
        {errors.password && touched.password && (
          <div className="form-error auth-error">{errors.password}</div>
        )}
        <button className="submit-btn auth-btn" type="submit">
          Inicia sesión
        </button>
        <div className="auth-suggestion">
          No tienes una cuenta?{" "}
          <Link className="auth-link" to={"/register"}>
            Regístrate
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
