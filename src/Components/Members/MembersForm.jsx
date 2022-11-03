import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { apiONG } from '../../Services/apiONG';

import '../FormStyles.css';
import './membersForm.css'

// ID de miembro existente 875

const MembersForm = () => {

  const { id } = useParams();
  
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

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

  const getBase64 = (file) => (
    new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    })
  );

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    // Simulación de llamada a la api
    setTimeout(() => {

      getBase64(file)
        .then(result => {
          setImagePreview(() => (result))
          Swal.fire({
            title: "Miembro creado correctamente",
            text: "Imagen procesada satisafactoriamente",
            icon: 'success',
            timer: 5000
          })
          console.log({ ...values, image: result })
          setSubmitting(false)
        })
        .catch(() => {
          Swal.fire({
            title: "Tuvimos problemas con la carga de la imagen",
            icon: 'error',
            timer: 5000
          })
          setSubmitting(false)
        });

    }, 2000)

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
    setValues,
    handleBlur,
    setSubmitting,
    setFieldValue,
    setFieldTouched,
    values,
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
      apiONG
        .get(`/members/${id}`)
        .then(({ data: { data } }) => {
          setValues(() => ({ ...data, image: '' }))
        })
        .catch((error) => {
          const errorMessage =
            error?.response?.data?.message
            || error.message;

          Swal.fire({
            title: errorMessage,
            icon: 'error',
            timer: 5000
          })
        })
    }

  }, [id, setValues, setSubmitting])

  return (
    <div className={
      isSubmitting ? 'categoriesContainer pulse' : 'categoriesContainer'
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
          <div className='preview-container' style={{ backgroundImage: `url(${imagePreview})` }}>
          </div>
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