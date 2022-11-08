import React, { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import "../../FormStyles.css";
import "./NewsletterForm.css"

export const NewsletterForm = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const newsletter = localStorage.getItem("newsletter");
  const initialValues = {
    email: newsletter,
  };
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("El email debe tener un formato válido")
      .required("El email es obligatorio"),
  });

  const onSubmit = ({ email }) => {
    if (!isSubscribed) {
      localStorage.setItem("newsletter", email);
      Swal.fire(
        "Genial!",
        "Ya estás al tanto de nuestras novedades!",
        "success"
      );
      setIsSubscribed(true);
    } else {
      setFieldValue("email", "", false);
      localStorage.setItem("newsletter", "");
      Swal.fire(
        "Te desubscribiste!",
        "Ya no recibirás nuestras novedades!",
        "success"
      );
      setIsSubscribed(false);
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
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (newsletter && newsletter !== "") setIsSubscribed(true);
  }, [newsletter]);

  return (
    <div className="">
      <form className="container p-2 shadow-sm " style={{border: "0px solid blue"}} onSubmit={handleSubmit}>
        <div className="row text-center h-25">
      <p >
        {isSubscribed
          ? "Ya estás subscripto a nuestro boletín de novedades!"
          : "No te pierdas nuestro boletín de novedades, subscríbete ya!"}{" "}
      </p>
      </div>
      <div className="row d-flex justify-content-evenly h-75 ">

        <input 
          className="col-6 col-md-4" 
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={isSubscribed ? newsletter : "Correo electrónico"}
          autoComplete="off"
        ></input>
        {errors.email && touched.email && (
          <div className="form-error">{errors.email}</div>
        )}

        <button className="col-4 col-md-3 subscription-btn"  type="submit">
          {isSubscribed ? "Desubscríbete" : "Subscríbete"}
        </button>
        </div>
      </form>
    </div>
  );
};
