import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { onSubmitService } from '../../Services/categoryFormServices';

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

    const requiredMessage = `es un campo requerido`

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup
                .string()
                .min(4, 'El nombre debe tener 4 caracteres como mínimo').required(`Titulo ${requiredMessage}`),
            description: Yup.string().required(`La Descripción ${requiredMessage}`),
            image: Yup.string().matches(
                jpgRegExp, {
                message: 'La imagen debe se un archivo .jpg o .png',
                excludeEmptyString: true
            }).required(`La imagen ${requiredMessage}`)
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
        <div className='categoriesContainer'>
            <h1 className='categoriesForm-Title'>Formulario de Categorias</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className='input-label-contariner'>
                    <label
                        htmlFor='inputTitle'
                    >
                        Titulo
                    </label>
                    <input
                        id='inputTitle'
                        className="input-field"
                        type="text"
                        name="name"
                        value={name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba el título de la categoría"
                    />
                    <div className='categoriesForm-errorContainer'>
                        {errorName && touchedName && <span>{errorName}</span>}
                    </div>
                </div>
                <div className='input-label-contariner'>
                    <label>
                        Descripcion
                    </label>
                    <CKEditor
                    className='border-rounded'
                        editor={ClassicEditor}
                        data={description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue('description', data)
                        }}
                        onBlur={() => {
                            setFieldTouched('description')
                        }}
                    />
                    <div className='categoriesForm-errorContainer'>
                        {errorDescription && touchedDescription && <span>{errorDescription}</span>}
                    </div>
                </div>
                <div className='input-label-contariner'>
                    <label
                        htmlFor='inputImage'
                    >
                        Imagen
                    </label>
                    <input
                        id='inputImage'
                        className="input-field"
                        type="file"
                        name="image"
                        value={image}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Agregar una imagen"
                    />
                    <div className='categoriesForm-errorContainer'>
                        {errorImage && touchedImage && <span>{errorImage}</span>}
                    </div>
                </div>
                <button className="submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CategoriesForm;