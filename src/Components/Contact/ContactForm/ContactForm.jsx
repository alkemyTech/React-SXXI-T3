import { useState } from "react";
import { useFormik } from "formik";
import {CKEditorField} from "../../Form/CKEditorField";
import Swal from "sweetalert2";

import { validationSchema } from "./utils";
import {InputField} from "../../Form/InputField";
import Button from "../../Button/Button";

import '../../FormStyles.css';

const ContactForm = ({children}) => {
    const [isFetching, setIsFetching] = useState(false);
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        message: ''
    }

    const onSubmit = () => {
        setIsFetching(() => (true))
        setTimeout(() => {
            Swal.fire({
                title: 'Campos Validados',
                icon: 'success',
                text: 'Mas adelante se enviará un email'
            })
            setSubmitting(false)
            setIsFetching(() => (false))
        }, 2000)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    const {
        handleBlur,
        handleSubmit,
        setSubmitting,
        isSubmitting,
        handleChange,
        setFieldValue,
        setFieldTouched,
        values: { name, email, phone, message },
        touched: {
            name: touchedName,
            email: touchedEmail,
            phone: touchedPhone,
            message: touchedMessage
        },
        errors: {
            name: errorName,
            email: errorEmail,
            phone: errorPhone,
            message: errorMessage
        }
    } = formik;

    const isLoading = isFetching || isSubmitting;
    return (
        <div className={
            isLoading ? 'main-container pulse' : 'main-container'
        }>

            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className='form-title'>Dejanos tu mensaje</h1>
                <InputField
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    placeholder="Ingrese su nombre"
                    errors={errorName}
                    touched={touchedName}
                />
                <InputField
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    placeholder="Ingrese su email"
                    errors={errorEmail}
                    touched={touchedEmail}
                />
                <InputField
                    label="Teléfono"
                    name="phone"
                    value={phone}
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    placeholder="Ingrese su teléfono"
                    errors={errorPhone}
                    touched={touchedPhone}
                />
               <CKEditorField
                        label="Mensaje"
                        name="message"
                        value={message}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        placeholder="Ingrese su mensaje"
                        errors={errorMessage}
                        touched={touchedMessage}
               />
              <Button type="submit" variant="primary" label="Enviar" disabled={isSubmitting}/>
            {children}
            </form>
        </div>
    )
}

export default ContactForm;