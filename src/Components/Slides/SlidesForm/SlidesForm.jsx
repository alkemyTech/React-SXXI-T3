import {useFormik} from 'formik';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useParams} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import Swal from 'sweetalert2';

import {onSubmitService} from '../../../Services/slideService';
import {apiONG} from '../../../Services/apiONG';
import {initialValues, validationSchema} from "./constants";

import '../../FormStyles.css';
import {CKEditorField, InputField} from "../../Form";
import Button from "../../Button/Button";

const SlidesForm = () => {
    const { id } = useParams();
    const imageRef = useRef();
    const [imagePreview, setImagePreview] = useState(null);
    const [isFetching, setIsFetching] = useState(false);


    const onSubmit = () => {
        const file = imageRef.current.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function () {
            setImagePreview(fileReader.result)
            onSubmitService(
                id,
                values.name,
                values.description,
                fileReader.result,
                values.order,
                resetForm,
                setSubmitting
            );
        };

        fileReader.onerror = () => {
            setSubmitting(false);
            Swal.fire({
                title: 'Error al procesar la imagen',
                icon: 'error',
                timer: 5000
            });
        };

        fileReader.readAsDataURL(file);
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
        setValues,
        isSubmitting,
        setSubmitting,
        resetForm,
        values,
        touched,
        errors
    } = formik;

    useEffect(() => {
        if (id) {
            setIsFetching(() => (true))
            apiONG
                .get(`/slides/${id}`)
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

    const isLoading = isSubmitting || isFetching;

    return (
        <div className={
            isLoading ? 'main-container pulse' : 'main-container'
        }>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className='form-title'>{id ? "Editar" : "Crear"} Slide</h1>
                <InputField
                    label="Nombre"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingrese el nombre de la slide"
                    errors={errors.name}
                    touched={touched.name}
                />
                <CKEditorField
                    placeholder="Ingrese la descripción de la slide"
                    value={values.description}
                    errors={errors.description}
                    touched={touched.description}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    name="description"
                    label="Descripción"
                />
                <InputField
                    label= {id ? "Modificar imagen" : "Cargar imagen"}
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.image}
                    touched={touched.image}
                    type="file"
                    ref={imageRef}
                />
                <div className='input-preview-image'>
                    {
                        id ?
                            (<div className='preview-container' style={{ backgroundImage: `url(${imagePreview})` }}>
                            </div>)
                            : null
                    }
                </div>
                <InputField
                    label="Número de orden"
                    name="order"
                    value={values.order}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingrese el número de orden de la slide"
                    errors={errors.order}
                    touched={touched.order}
                />
                <Button type="submit" label="Enviar" variant="primary" className="form-button"/>
            </form>
        </div>
    );
}

export default SlidesForm;