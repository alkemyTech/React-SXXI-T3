import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { onSubmitService } from '../../Services/categoryFormServices';

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

    const initialValues = category ? existentCategory : newCategory;

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup.string().min(4).required(),
            description: Yup.string().required(),
            image: Yup.string().matches(
                jpgRegExp, {
                message: 'image must be .jpg or .png file', excludeEmptyString: true
            }).required()
        });

    const onSubmit = () => {
        onSubmitService(
            category,
            name,
            description,
            resetForm
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
        resetForm,
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