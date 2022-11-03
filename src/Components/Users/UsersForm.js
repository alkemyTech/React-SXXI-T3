import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { onSubmitService } from '../../Services/userFormServices';

import { useParams } from 'react-router-dom';

import '../FormStyles.css';
import { useEffect, useState, useRef } from 'react';

const UsersForm = () => {

    const { id } = useParams();
    const imageRef = useRef();

    const newUser = {
        name: '',
        email: '',
        password: '',
        image: '',
        imageBase64: '',
        role: ''
    }

    const initialValues = newUser;

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const requiredMessage = `es un campo requerido`

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup
                .string()
                .min(4, 'El título debe tener 4 caracteres como mínimo')
                .required(`El Nombre ${requiredMessage}`),
            email: Yup
                .string()
                .email
                .required(`La email ${requiredMessage}`),
            password: Yup,
            image: Yup
                .string()
                .matches(
                    jpgRegExp, {
                    message: 'La imagen debe se un archivo .jpg o .png',
                    excludeEmptyString: true
                })
                .required(`La imagen ${requiredMessage}`),
            role: Yup
                .string()
                .trim()
                .required(`El rol ${requiredMessage}`)

        });

    const onSubmit = () => {
        const file = imageRef.current.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = function () {
            setFieldValue('imageBase64', fileReader.result); 
        };
        fileReader.readAsDataURL(file);

        onSubmitService(
            id,
            name,
            email,
            password,
            imageBase64,
            role,
            resetForm,
            setSubmitting
        );
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        setSubmitting,
        resetForm,
        values: { name, email, password, image, imageBase64, role },
        touched: { name: touchedName, email: touchedEmail, password: touchedPassword, image: touchedImage, role: touchedRole },
        errors: { name: errorName, email: errorEmail, password: errorPassowrd, image: errorImage, role: errorrole }
    } = formik;

    return (
        <div className={
            isSubmitting ? 'main-container pulse' : 'main-container'
        }>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className='form-title'>Formulario de Slides</h1>
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba el Nombre del Usuario"
                    />
                    <div className='form-error'>
                        {errorName && touchedName && <span>{errorName}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputPassword'
                    >
                        Título
                    </label>
                    <input
                        id='inputPassword'
                        className="input-field"
                        type="password"
                        name="name"
                        value={password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba la password del Usuario"
                    />
                    <div className='form-error'>
                        {errorName && touchedName && <span>{errorName}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputImage'
                    >
                        Agregar una imagen
                    </label>

                    <input
                        ref={imageRef}
                        type="file"
                        name="image"
                        id='inputImage'
                        className="input-field"
                        value={image}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <div className='form-error'>
                        {errorImage && touchedImage && <span>{errorImage}</span>}
                    </div>
                </div>
                <button className="submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default UsersForm;