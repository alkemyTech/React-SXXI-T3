import { useEffect, useRef } from "react";

import { useFormik } from "formik";
import * as Yup from 'yup';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Swal from "sweetalert2";

import { apiONG } from "../../../Services/apiONG";
import { getBase64 } from "../../../utils/getBase64";
import { useState } from "react";

import Button from '../../Button/Button';

import styles from './organizationForm.module.css';

const OrganizationForm = () => {

    const imageRef = useRef();

    const [isFetching, setIsFetching] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const initialValues = {
        name: '',
        logo: '',
        facebook_url: '',
        linkedin_url: '',
        instagram_url: '',
        twitter_url: '',
        short_description: '',
        long_description: ''
    }

    const imgRegExp = /\.(jpe?g|png)$/i;
    const requiredMessage = `es un campo requerido`
    const errorUrlMessage = `Url inválida`

    const validationSchema = () => (
        Yup.object().shape({
            name: Yup.string().required(`El nombre de la organización ${requiredMessage}`),
            logo: Yup.string().matches(imgRegExp, {
                message: `La imagen debe ser un archivo .jpeg o .png`
            }).required(`El logo ${requiredMessage}`),
            facebook_url: Yup.string().url(errorUrlMessage).required(`El link de facebook ${requiredMessage}`),
            linkedin_url: Yup.string().url(errorUrlMessage).required(`El link de linkedin ${requiredMessage}`),
            instagram_url: Yup.string().url(errorUrlMessage).required(`EL link de instagram ${requiredMessage}`),
            twitter_url: Yup.string().url(errorUrlMessage).required(`El link de twitter ${requiredMessage}`),
            short_description: Yup.string().required(`La descripción breve ${requiredMessage}`),
            long_description: Yup.string().required(`La descipción completa ${requiredMessage}`)
        })
    )

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
        values: {
            name,
            logo,
            facebook_url,
            linkedin_url,
            instagram_url,
            twitter_url,
            short_description,
            long_description,
        },
        errors: {
            name: errorName,
            logo: errorLogo,
            facebook_url: errorFacebook,
            linkedin_url: errorLinkedin,
            instagram_url: errorInsta,
            twitter_url: errorTwitter,
            long_description: errorLongDesc,
            short_description: errorShortDesc
        },
        touched: {
            name: touchedName,
            logo: touchedLogo,
            facebook_url: touchedFacebook,
            linkedin_url: touchedLinkedin,
            instagram_url: touchedInsta,
            twitter_url: touchedTwitter,
            long_description: touchedLongDesc,
            short_description: touchedShortDesc
        } } = formik;

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
                <h1 className="form-title">Edición de datos de la Organización</h1>
                <div className="input-preview-image">
                    <div className="input-label-container">
                        <label htmlFor="inputName">Nombre</label>
                        <input
                            id="inputName"
                            type="text"
                            className="input-field"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div className='form-error'>
                            {errorName && touchedName && <span>{errorName}</span>}
                        </div>
                    </div>
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
                <div className='input-label-container'>
                    <label
                        htmlFor='inputLogo'
                    >
                        Nuevo Logo
                    </label>

                    <input
                        ref={imageRef}
                        type="file"
                        name="logo"
                        id='inputLogo'
                        className="input-field"
                        value={logo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <div className='form-error'>
                        {errorLogo && touchedLogo && <span>{errorLogo}</span>}
                    </div>
                </div>
                <div className="input-label-container">
                    <label htmlFor="inputFacebook">Facebook</label>
                    <input
                        id="inputFacebook"
                        type="text"
                        placeholder="https://www.facebook.com/..."
                        className="input-field"
                        name="facebook_url"
                        value={facebook_url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className='form-error'>
                        {errorFacebook && touchedFacebook && <span>{errorFacebook}</span>}
                    </div>
                </div>
                <div className="input-label-container">
                    <label htmlFor="inputLinkedin">Linkedin</label>
                    <input
                        id="inputLinkedin"
                        type="text"
                        className="input-field"
                        name="linkedin_url"
                        placeholder="https://www.linkedin.com/..."
                        value={linkedin_url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className='form-error'>
                        {errorLinkedin && touchedLinkedin && <span>{errorLinkedin}</span>}
                    </div>
                </div>
                <div className="input-label-container">
                    <label htmlFor="inputInstagram">Instagram</label>
                    <input
                        id="inputInstagram"
                        type="text"
                        className="input-field"
                        name="instagram_url"
                        placeholder="https://www.instagram.com/..."
                        value={instagram_url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className='form-error'>
                        {errorInsta && touchedInsta && <span>{errorInsta}</span>}
                    </div>
                </div>
                <div className="input-label-container">
                    <label htmlFor="inputTwitter">Twitter</label>
                    <input
                        id="inputTwitter"
                        type="text"
                        className="input-field"
                        name="twitter_url"
                        placeholder="https://www.twitter.com/..."
                        value={twitter_url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className='form-error'>
                        {errorTwitter && touchedTwitter && <span>{errorTwitter}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label>
                        Descripción resumida
                    </label>
                    <div className={styles.editorStyles}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={short_description}
                            config={{ placeholder: 'Describa brevemente la organización' }}
                            onFocus={(event, editor) => {
                                editor.setData(short_description)
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue('short_description', data)
                            }}
                            onBlur={(event, editor) => {
                                setFieldTouched('short_description')
                            }}
                        />
                    </div>
                    <div className='form-error'>
                        {errorShortDesc && touchedShortDesc && <span>{errorShortDesc}</span>}
                    </div>
                </div>
                <div className="input-label-container">
                    <label htmlFor="inputLongDescription">Descripción completa</label>
                    <textarea
                        name="long_description"
                        id="inputLongDescription"
                        cols="30"
                        rows="10"
                        className={styles.input_textArea}
                        value={long_description}
                        placeholder={'Realize una descripción completa de la organización'}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <div className='form-error'>
                        {errorLongDesc && touchedLongDesc && <span>{errorLongDesc}</span>}
                    </div>
                </div>
                <Button disabled={isSubmitting} type={"submit"} label="Enviar" variant="primary" />
            </form>

        </div>
    )
}

export default OrganizationForm;