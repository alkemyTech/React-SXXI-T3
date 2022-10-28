import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../FormStyles.css';
import './categoriesForm.css';

const CategoriesForm = ({ category }) => {

    const newCategory = {
        name: '',
        description: '',
        image: ''
    }

    const existentCategory = {
        name: category?.name,
        description: category?.description,
        image: ''
    }

    let initialValues = category ? existentCategory : newCategory;

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup.string().min(4).required(),
            description: Yup.string().required(),
            image: Yup.string().matches(jpgRegExp, { message: 'image must be .jpg or .png file', excludeEmptyString: true }).required()
        });

    const onSubmit = () => {
        if (category) {
            axios
                .put(`https://ongapi.alkemy.org/api/categories/${category.id}`, {
                    name: values.name,
                    description: values.description
                })
                .then((response) => {
                    const { data: { message } } = response;
                    return Swal.fire({
                        title: message,
                        icon: 'success',
                        timer: 3000
                    })
                })
                .catch((error) => {
                    const errorMessage = (
                        error.response
                        && error.response.data
                        && error.response.data.message
                    ) || error.message
    
                    Swal.fire({
                        title: errorMessage,
                        icon: 'error'
                    })
                });

        } else {
            axios
                .post('https://ongapi.alkemy.org/api/categories', {
                    name: values.name,
                    description: values.description
                })
                .then((response) => {
                    const { data: { message } } = response;
                    Swal.fire({
                        title: message,
                        icon: 'success',
                        timer: 3000
                    })
                    return resetForm();
                })
                .catch((error) => {
                    const errorMessage = (
                        error.response
                        && error.response.data
                        && error.response.data.message 
                        && `Category'name alredy exists`
                    ) || error.message
    
                    Swal.fire({
                        title: errorMessage,
                        icon: 'error',
                        timer:5000
                    })
                })
        }
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
        resetForm,
        values,
        values: { name, description, image },
        touched: { name: touchedName, description: touchedDescription, image: touchedImage },
        errors: { name: errorName, description: errorDescription, image: errorImage }
    } = formik;

    return (
        <div>
            <h1 className='categoriesForm-Title'>Categories Form</h1>
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
                <div className='categoriesForm-errorContainer'>
                    {errorName && touchedName && <span>{errorName}</span>}
                </div>

                <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue('description', data)
                    }}
                    onBlur={() => {
                        setFieldTouched('description', 'description is a required field')
                    }}
                />

                <div className='categoriesForm-errorContainer'>
                    {errorDescription && touchedDescription && <span>{errorDescription}</span>}
                </div>
                <input
                    className="input-field"
                    type="file"
                    name="image"
                    value={image}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Add an image"
                />
                <div className='categoriesForm-errorContainer'>
                    {errorImage && touchedImage && <span>{errorImage}</span>}
                </div>
                <button className="submit-btn" type="submit">Send</button>
            </form>
        </div>
    );
}

export default CategoriesForm;