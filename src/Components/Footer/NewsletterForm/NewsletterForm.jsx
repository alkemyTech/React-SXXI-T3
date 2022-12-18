import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../../Button/Button";
import { infoAlert } from "../../Feedback/AlertService";
import { InputField } from "../../Form";
import "../../FormStyles.css";
import "./NewsletterForm.css";


export const NewsletterForm = () => {
  const isSubscribed = Boolean(localStorage.getItem("newsletter"));
  const navigate = useNavigate();
  const location = useLocation()

  const initialValues = {
    news_email: "",
  };

  const validationSchema = yup.object().shape({
    news_email: yup
      .string()
      .email("El email debe tener un formato válido")
      .required("El email es obligatorio"),
  });

  const onSubmit = ({ news_email }) => {
    localStorage.setItem("newsletter", news_email);
    infoAlert("Genial!", "Ya estás al tanto de nuestras novedades!");
    navigate(location.pathname);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleChange, handleBlur, handleSubmit, errors, touched, values } =
    formik;

  return (
    <>
      {!isSubscribed && (
        <form className="container p-2 newsletter-form" onSubmit={handleSubmit}>
          <div className="row text-center h-25 w-100 text-center">
            <p>No te pierdas nuestro boletín de novedades, subscríbete ya!</p>
          </div>
          <div className="row d-flex justify-content-evenly h-75 news-form">
            <InputField
              className="col-8"
              type="email"
              name="news_email"
              value={values.news_email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Correo electrónico"
              errors={errors.news_email}
              touched={touched.news_email}
            />
            <Button
              type="submit"
              label="Suscríbete"
              variant="primary"
              className="newsletter-button"
            />
          </div>
        </form>
      )}
    </>
  );
};
