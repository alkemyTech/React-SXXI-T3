import {useFormik} from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import "../../FormStyles.css";
import "./NewsletterForm.css";
import Button from "../../Button/Button";

export const NewsletterForm = () => {
    const isSubscribed = Boolean(localStorage.getItem("newsletter"));

    const initialValues = {
        email: "",
    };

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("El email debe tener un formato válido")
            .required("El email es obligatorio"),
    });

    const onSubmit = ({email}) => {
        localStorage.setItem("newsletter", email);
        Swal.fire("Genial!", "Ya estás al tanto de nuestras novedades!", "success");
    };

    const formik = useFormik({initialValues, validationSchema, onSubmit});

    const {handleChange, handleBlur, handleSubmit, errors, touched, values} =
        formik;

    return (
        <>
            {!isSubscribed && (
                <form
                    className="container p-2 newsletter-form"
                    onSubmit={handleSubmit}
                >
                    <div className="row text-center h-25">
                        <p>No te pierdas nuestro boletín de novedades, subscríbete ya!</p>
                    </div>
                    <div className="row d-flex justify-content-evenly h-75 ">
                        <input
                            className="input-field col-6"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Correo electrónico"
                            autoComplete="off"
                        ></input>
                        <Button type="submit" label="Suscríbete" variant="primary" className="newsletter-button"/>
                    </div>
                    {errors.email && touched.email && (
                        <div className="form-error">{errors.email}</div>
                    )}
                </form>
            )}
        </>
    );
};
