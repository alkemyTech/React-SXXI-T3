import {useFormik} from 'formik';
import {useParams} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';

import {createValidationSchema, editValidationSchema, initialValues} from "./constants";
import {getBase64} from '../../../utils/getBase64';
import {CKEditorField, InputField} from "../../Form";
import Button from "../../Button/Button";
import {defaultImage} from "../../../utils/defaultImage";

import '../../FormStyles.css';
import {apiMember} from '../../../Services/apiService';
import {errorAlert} from '../../Feedback/AlertService';
import {onSubmitService} from "../../../Services/memberService";

const MembersForm = () => {
  const { id } = useParams();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [isFetching, setIsFetching] = useState(false);
  const validationSchema = id ? editValidationSchema : createValidationSchema

  const validate = (values) => {
    const errors = {};
    const { name } = values;
    if (name && (name.length >= 4) && Number(name)) {
      errors.name = 'El nombre no puede contener unicamente números'
    }
    return errors;
  }

  const onSubmit = () => {
    const file = imageRef.current.files[0];
    if (file) {
      getBase64(file)
          .then(result => {
            onSubmitService(
                id,
                {name:values.name, description:values.description, facebookUrl:values.facebookUrl, linkedinUrl:values.linkedinUrl, image: result},
                resetForm,
                setSubmitting
            )
          })
          .catch(({ message }) => {
            setSubmitting(false)
            errorAlert("Error al procesar la imagen");
          });
    }else{
      onSubmitService(
          id,
          {name:values.name, description:values.description, facebookUrl:values.facebookUrl, linkedinUrl:values.linkedinUrl},
          resetForm,
          setSubmitting
      )
    }

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
    values,
    touched,
    errors
  } = formik;

  useEffect(() => {
    if (id) {
      setIsFetching(() => (true))
      apiMember
          .getSingle(`${id}`)
          .then((response) => {
            setValues({ ...response, image: '' })
            setImagePreview(response.image)
            setIsFetching(false)
          })
          .catch((error) => {
            setIsFetching(() => (false));
            errorAlert();
          });
    }

  }, [id, setValues])

  const handleImageChange = (event) => {
    handleChange(event);
    const file = event.target.files[0];
    if (file.type.includes('image')) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const isLoading = isFetching || isSubmitting;

  return (
      <div className={
        isLoading ? 'main-container pulse' : 'main-container'
      }>

        <form className="form-container" onSubmit={handleSubmit}>
          <h1 className='form-title'> {id ? "Editar" : "Crear"}  Miembro</h1>
          <div className='input-preview-image'>
            <InputField
                label="Nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese el nombre del miembro"
                errors={errors.name}
                touched={touched.name}
            />
            <img src={imagePreview} alt="preview" className='preview-container'/>
          </div>
          <InputField
              label="Facebook"
              name="facebookUrl"
              value={values.facebookUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ingrese el Facebook del miembro"
              errors={errors.facebookUrl}
              touched={touched.facebookUrl}
          />
          <InputField
              label="Linkedin"
              name="linkedinUrl"
              value={values.linkedinUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ingrese el Linkedin del miembro"
              errors={errors.linkedinUrl}
              touched={touched.linkedinUrl}
          />
          <CKEditorField
              placeholder="Ingrese la descripción del miembro"
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
              onChange={handleImageChange}
              onBlur={handleBlur}
              errors={errors.image}
              touched={touched.image}
              type="file"
              ref={imageRef}
          />
          <Button type="submit" label="Enviar" variant="primary" className="form-button"/>
        </form>
      </div>
  );
}

export default MembersForm;
