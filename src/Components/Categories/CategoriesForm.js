import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { onSubmitService } from '../../Services/categoryFormServices';
import Swal from 'sweetalert2';

import { apiONG } from '../../Services/apiONG';
import { getBase64 } from '../../utils/getBase64';

import '../FormStyles.css'
import './categoriesForm.css';

const CategoriesForm = () => {

    const { id } = useParams();
    const imageRef = useRef();
    const [imagePreview, setImagePreview] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const initialValues = {
        name: '',
        description: '',
        image: ''
    }

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const requiredMessage = `es un campo requerido`

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup
                .string()
                .min(4, 'El título debe tener 4 caracteres como mínimo')
                .required(`El título ${requiredMessage}`),
            description: Yup
                .string()
                .required(`La Descripción ${requiredMessage}`),
            image: Yup
                .string()
                .matches(
                    jpgRegExp, {
                    message: 'La imagen debe se un archivo .jpg o .png',
                    excludeEmptyString: true
                })
                .required(`La imagen ${requiredMessage}`)
        });

    const onSubmit = () => {
        const file = imageRef.current.files[0];
        getBase64(file)
            .then((result) => {
                setImagePreview(() => (result))
                onSubmitService(
                    id,
                    name,
                    description,
                    result,
                    resetForm,
                    setSubmitting
                );
            })
            .catch(({ message }) => {
                setSubmitting(false)
                Swal.fire({
                    title: message,
                    icon: 'error',
                    timer: 5000
                })
            });
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
        setValues,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        setSubmitting,
        resetForm,
        values: { name, description, image },
        touched: { name: touchedName, description: touchedDescription, image: touchedImage },
        errors: { name: errorName, description: errorDescription, image: errorImage }
    } = formik;

    useEffect(() => {
        if (id) {
            setIsFetching(() => (true));
            apiONG
                .get(`/categories/${id}`)
                .then(({ data: { data } }) => {
                    setValues(() => ({ ...data, image: '' }))
                    setImagePreview(() => (data.image))
                    setIsFetching(() => (false))
                })
                .catch((error) => {
                    const errorMessage =
                        error?.response?.data?.message
                        || error.message;
                    setIsFetching(() => (false))
                    Swal.fire({
                        title: errorMessage,
                        icon: 'error',
                        timer: 5000
                    })
                })
        }
    }, [id, setValues])

    const isLoading = isFetching || isSubmitting;

    return (
        <div className={
            isLoading ? 'main-container pulse' : 'main-container'
        }>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className='form-title'>Formulario de Categorías</h1>
                <div className='input-preview-image'>
                    <div className='input-label-container'>
                        <label
                            htmlFor='inputTitle'
                        >
                            Título
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
                        <div className='form-error'>
                            {errorName && touchedName && <span>{errorName}</span>}
                        </div>
                    </div>
                    {
                        id
                            ? (
                                <div
                                    className='preview-container'
                                    style={{ backgroundImage: `url(${imagePreview})` }}
                                >
                                </div>
                            )
                            : null
                    }
                </div>
                <div className='input-label-container'>
                    <label>
                        Descripción
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        config={{ placeholder: 'Realiza una descripción de esta categoría' }}
                        onFocus={(event, editor) => {
                            editor.setData(description)
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue('description', data)
                        }}
                        onBlur={(event, editor) => {
                            setFieldTouched('description')
                        }}
                    />
                    <div className='form-error'>
                        {errorDescription && touchedDescription && <span>{errorDescription}</span>}
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

export default CategoriesForm;