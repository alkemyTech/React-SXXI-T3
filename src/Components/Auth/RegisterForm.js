import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import "../FormStyles.css";
import "./Auth.css";

const RegisterForm = ({ desktop }) => {
  const initialValues = {
    email: "",
    password: "",
    confirm: "",
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
    confirm: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Debe coincidir con la contraseña ingresada"
      )
      .required("La confirmación de contraseña es obligatoria"),
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
          <>
            <div className="auth-title">Bienvenido</div>
            <div className="auth-subtitle">Registra tu nueva cuenta!</div>
          </>
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
        <input
          className="input-field auth-input"
          type="password"
          name="confirm"
          value={values.confirm}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Repite tu contraseña"
          autoComplete="off"
        ></input>
        {errors.confirm && touched.confirm && (
          <div className="form-error auth-error">{errors.confirm}</div>
        )}
        <button className="submit-btn auth-btn" type="submit">
          Registrarse
        </button>
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
