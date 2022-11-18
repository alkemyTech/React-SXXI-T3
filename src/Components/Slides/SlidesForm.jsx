import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';

import { onSubmitService } from '../../Services/slideService';
import { apiONG } from '../../Services/apiONG';
import '../FormStyles.css';

const SlidesForm = () => {

    const { id } = useParams();
    const imageRef = useRef();

    const newSlide = {
        name: '',
        description: '',
        image: '',
        order: ''
    }

    const initialValues = newSlide;

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const requiredMessage = `es un campo requerido`

    const [imagePreview, setImagePreview] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

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
                .required(`La imagen ${requiredMessage}`),
            order: Yup
                .string()
                .trim()
                .required(`El orden ${requiredMessage}`)
                .matches(/^[0-9]+$/, 'El Orden debe ser un numero')
        });

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
                <h1 className='form-title'>Formulario de {id ? "Edición" : "Creación"} de diapositivas</h1>
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
                        placeholder="Escriba el título de la diapositiva"
                        {...formik.getFieldProps('name')}
                    />
                    <div className='form-error'>
                        {errors.name && touched.name && <span>{errors.name}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label>
                        Descripción
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={values.description}
                        config={{ placeholder: 'Escriba la descripción' }}
                        onFocus={(event, editor) => {
                            editor.setData(values.description);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue('description', data);
                        }}
                        onBlur={(event, editor) => {
                            setFieldTouched('description');
                        }}
                    />
                    <div className='form-error'>
                        {errors.description && touched.description && <span>{errors.description}</span>}
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
                        value={values.image}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <div className='form-error'>
                        {errors.image && touched.image && <span>{errors.image}</span>}
                    </div>
                </div>
                <div className='input-preview-image'>
                    {
                        id ?
                            (<div className='preview-container' style={{ backgroundImage: `url(${imagePreview})` }}>
                            </div>)
                            : null
                    }
                </div>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputOrder'
                    >
                        Orden
                    </label>
                    <input
                        id='inputOrder'
                        className="input-field"
                        type="text"
                        name="order"
                        value={values.order}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba el Orden de la diapositiva"
                    />
                    <div className='form-error'>
                        {errors.order && touched.order && <span>{errors.order}</span>}
                    </div>
                </div>
                <button className="submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default SlidesForm;