import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import '../FormStyles.css';

const CategoriesForm = () => {

    const initialValues = {
        name: '',
        description: '',
        image: ''
    }

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
            image: Yup.string().required()
        })

    const onSubmit = () => {
        console.log(values);
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
        touched,
        values,
        values: { name, description, image },
        errors: { name: errorName, description: errorDescription, image: errorImage }
    } = formik;


    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                className="input-field"
                type="text"
                name="name"
                value={name}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Title"
            />
            {errorName && touched && <span>{errorName}</span>}
            <input
                className="input-field"
                type="text"
                name="description"
                value={description}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Write some description"
            />
            {errorDescription && touched && <span>{errorDescription}</span>}
            <input
                className="input-field"
                type="text"
                name="image"
                value={image}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Add an image"
            />
            {errorImage && touched && <span>{errorImage}</span>}
            <button className="submit-btn" type="submit">Send</button>
        </form>
    );
}

export default CategoriesForm;