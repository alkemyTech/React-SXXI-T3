import { useState } from "react";

import { useFormik } from "formik";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Swal from "sweetalert2";

import { validationSchema } from "./utils";

import '../FormStyles.css';

const ContactForm = () => {
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
                <h1 className='form-title'>Contactate con nosotros</h1>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputName'
                    >
                        Nombre
                    </label>
                    <input
                        id='inputName'
                        className="input-field"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingrese su nombre"
                    />
                    <div className='form-error'>
                        {errorName && touchedName && <span>{errorName}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputEmail'
                    >
                        Email
                    </label>
                    <input
                        id='inputEmail'
                        className="input-field"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingrese su email"
                    />
                    <div className='form-error'>
                        {errorEmail && touchedEmail && <span>{errorEmail}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputTelefono'
                    >
                        Teléfono
                    </label>
                    <input
                        id='inputTelefono'
                        className="input-field"
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingrese su telefono"
                    />
                    <div className='form-error'>
                        {errorPhone && touchedPhone && <span>{errorPhone}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label htmlFor='inputDescription'>
                        Mensaje
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={message}
                        config={{ placeholder: 'Escriba su mensaje' }}
                        onFocus={(event, editor) => {
                            editor.setData(message)
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue('message', data)
                        }}
                        onBlur={(event, editor) => {
                            setFieldTouched('message')
                        }}
                        onError={(errorInstance, errorDetail) => {
                            console.log({
                                errorInstance,
                                errorDetail
                            })
                        }}
                    />
                    <div className='form-error'>
                        {errorMessage && touchedMessage && <span>{errorMessage}</span>}
                    </div>
                </div>
                <button
                    disabled={isSubmitting}
                    className="submit-btn"
                    type="submit"
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}

export default ContactForm;