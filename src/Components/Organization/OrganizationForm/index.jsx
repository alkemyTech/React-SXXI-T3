import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";

import { apiONG } from "../../../Services/apiONG";
import { getBase64 } from "../../../utils/getBase64";
import { useState } from "react";
import { initialValues, validationSchema} from "./constants";
import Button from '../../Button/Button';

import styles from './organizationForm.module.css';
import {CKEditorField, InputField, TextAreaField} from "../../Form";

const OrganizationForm = () => {

    const imageRef = useRef();

    const [isFetching, setIsFetching] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit = () => {
        const file = imageRef.current.files[0];
        setTimeout(() => {
            getBase64(file)
                .then((result) => {
                    setSubmitting(false)
                    setIsFetching(() => (false))
                    setImagePreview(() => (result))
                })
                .then(() => {
                    Swal.fire({
                        title: 'Organizacion Actualizada',
                        icon: 'success'
                    })
                })
        }, 2000)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    const {
        handleBlur,
        handleChange,
        handleSubmit,
        setValues,
        setFieldValue,
        setFieldTouched,
        setSubmitting,
        isSubmitting,
        values,
        errors,
        touched
    } = formik;

    useEffect(() => {
        setIsFetching(() => (true))
        apiONG
            .get(`/organization`)
            .then(({ data: { data } }) => {
                setIsFetching(() => (false))
                setImagePreview(() => (data.logo))
                setValues(() => ({ ...data, logo: '' }))
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
    }, [setValues])

    const isLoading = isFetching || isSubmitting;

    return (
        <div className={
            isLoading ? 'main-container pulse' : 'main-container'
        }>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className="form-title">Editar datos de la Organización</h1>
                <div className="input-preview-image">
                    <InputField
                        label="Nombre"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingrese el nombre de la organización"
                        errors={errors.name}
                        touched={touched.name}
                    />
                    {
                        imagePreview
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
                <InputField
                    label= "Modificar logo"
                    name="image"
                    value={values.logo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.logo}
                    touched={touched.logo}
                    type="file"
                    ref={imageRef}
                />
                <InputField
                    label="Facebook"
                    name="linkedin_url"
                    value={values.facebook_url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://www.facebook.com/..."
                    errors={errors.facebook_url}
                    touched={touched.facebook_url}
                />
                <InputField
                    label="Linkedin"
                    name="linkedin_url"
                    value={values.linkedin_url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://www.linkedin.com/..."
                    errors={errors.linkedin_url}
                    touched={touched.linkedin_url}
                />
                <InputField
                    label="Instagram"
                    name="instagram_url"
                    value={values.instagram_url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://www.instagram.com/..."
                    errors={errors.instagram_url}
                    touched={touched.instagram_url}
                />
                <InputField
                    label="Twitter"
                    name="twitter_url"
                    value={values.twitter_url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://www.twitter.com/..."
                    errors={errors.twitter_url}
                    touched={touched.twitter_url}
                />
                <CKEditorField
                    placeholder='Describa brevemente la organización'
                    value={values.short_description}
                    errors={errors.short_description}
                    touched={touched.short_description}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    name="short_description"
                    label="Descripción resumida"
                    className={styles.editorStyles}
                />
                <TextAreaField
                    name='long_description'
                    value={values.long_description}
                    touched={touched.long_description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={errors.long_description}
                    label='Descripción completa'
                    inputClassName={styles.input_textArea}
                />
                <Button disabled={isSubmitting} type={"submit"} label="Enviar" variant="primary" />
            </form>

        </div>
    )
}

export default OrganizationForm;