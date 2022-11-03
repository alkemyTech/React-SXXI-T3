import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { apiONG } from '../../Services/apiONG';
import { onSubmitService } from '../../Services/membersFromServices';
import { getBase64 } from '../../utils/getBase64';

import '../FormStyles.css';
import './membersForm.css'

const MembersForm = () => {

  const { id } = useParams();

  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const initialValues = {
    name: '',
    description: '',
    image: '',
    facebookUrl: '',
    linkedinUrl: ''
  }

  const imgRegExp = /\.(jpe?g|png)$/i;
  const requiredMessage = `es un campo requerido`

  const validate = (values) => {
    const errors = {};
    const { name } = values;

    if (name && (name.length >= 4) && Number(name)) {
      errors.name = 'El nombre no puede contener unicamente números'
    }
    return errors;
  }

  const validationSchema = () => (
    Yup.object().shape({
      name: Yup.string().min(4, 'El nombre debe tener al menos 4 caracteres')
        .required(`El nombre ${requiredMessage}`),
      facebookUrl: Yup.string().url("Url inválida")
        .required(`La url de Facebook ${requiredMessage}`),
      linkedinUrl: Yup.string().url("Url inválida")
        .required(`La url de Linkedin ${requiredMessage}`),
      description: Yup.string()
        .required(`La descripción ${requiredMessage}`),
      image: Yup.string()
        .matches(
          imgRegExp, {
          message: 'La imagen debe se un archivo .jpg o .png',
          excludeEmptyString: true
        })
        .required(`La imagen ${requiredMessage}`)
    })
  );

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    getBase64(file)
      .then(result => {
        setImagePreview(() => (result))
        onSubmitService(
          id,
          name,
          description,
          facebookUrl,
          linkedinUrl,
          result,
          resetForm,
          setSubmitting
        )
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
    validate,
    validationSchema,
    onSubmit
  })

  const {
    handleSubmit,
    isSubmitting,
    handleChange,
    resetForm,
    setValues,
    handleBlur,
    setSubmitting,
    setFieldValue,
    setFieldTouched,
    values: { name, description, image, facebookUrl, linkedinUrl },
    touched: {
      name: touchedName,
      description: touchedDescription,
      image: touchedImage,
      facebookUrl: touchedFacebook,
      linkedinUrl: touchedLinkedin
    },
    errors: {
      name: errorName,
      description: errorDescription,
      image: errorImage,
      facebookUrl: errorFacebook,
      linkedinUrl: errorLinkedin
    }
  } = formik;

  useEffect(() => {
    if (id) {
      setIsFetching(() => (true))
      apiONG
        .get(`/members/${id}`)
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
        <h1 className='form-title'>Formulario de Miembros</h1>
        <div className='input-preview-image'>
          <div className='input-label-container'>
            <label
              htmlFor='inputTitle'
            >
              Nombre
            </label>
            <input
              id='inputTitle'
              className="input-field"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ingrese el nombre del miembro"
            />
            <div className='form-error'>
              {errorName && touchedName && <span>{errorName}</span>}
            </div>

          </div>
          {
            id
              ? (<div className='preview-container' style={{ backgroundImage: `url(${imagePreview})` }}>
              </div>)
              : null
          }
        </div>
        <div className='input-label-container'>
          <label
            htmlFor='inputFacebook'
          >
            Facebook
          </label>
          <input
            id='inputFacebook'
            className="input-field"
            type="text"
            name="facebookUrl"
            value={facebookUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese Facebook del miembro"
          />
          <div className='form-error'>
            {errorFacebook && touchedFacebook && <span>{errorFacebook}</span>}
          </div>
        </div>
        <div className='input-label-container'>
          <label
            htmlFor='inputLinkedin'
          >
            Linkedin
          </label>
          <input
            id='inputLinkedin'
            className="input-field"
            type="text"
            name="linkedinUrl"
            value={linkedinUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese Linkedin del miembro"
          />
          <div className='form-error'>
            {errorLinkedin && touchedLinkedin && <span>{errorLinkedin}</span>}
          </div>
        </div>
        <div className='input-label-container'>
          <label htmlFor='inputDescription'>
            Descripción
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            config={{ placeholder: 'true' }}
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
            onError={(errorInstance, errorDetail) => {
              console.log({
                errorInstance,
                errorDetail
              })
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
            {id ? 'Modificar imagen actual' : 'Agregar una imagen'}
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
        <button
          disabled={isSubmitting}
          className="submit-btn"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>

  );
}

export default MembersForm;