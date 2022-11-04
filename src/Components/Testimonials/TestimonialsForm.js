import '../FormStyles.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Swal from 'sweetalert2';

import { useParams } from 'react-router-dom';

import { onSubmitService } from '../../Services/testimonialService.js';

import { useRef } from 'react';

const TestimonialsForm = () => {
    const { id } = useParams();
    const imageRef = useRef();
    const newTestimonial = {
        name: '',
        description: '',
        image: '',
    };

    const initialValues = newTestimonial;

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
        const fileReader = new FileReader();

        fileReader.onload = function () {
            onSubmitService(
                id,
                values.name,
                values.description,
                fileReader.result,
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
        isSubmitting,
        setSubmitting,
        resetForm,
        values,
        touched,
        errors
    } = formik;

    return (
        <div className={
            isSubmitting ? 'main-container pulse' : 'main-container'
        }>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className='form-title'>Formulario de {id ? "Edición" : "Creación"} de Testimonio</h1>
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
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba el título del Testimonio"
                    />
                    <div className='form-error'>
                        {errors.name && touched.name && <span>{errors.name}</span>}
                    </div>
                </div>
                <div className='input-label-contariner'>
                    <label>
                        Descripción
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={values.description ? values.description : '<p>Describa el Testimonio</p>'}
                        onFocus={(event, editor) => {
                            editor.setData(values.description)
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            if (data !== '<p>Describa el Testimonio</p>') {
                                setFieldValue('description', data)
                            }
                        }}
                        onBlur={(event, editor) => {
                            setFieldTouched('description')
                            const data = editor.getData();
                            !data && editor.setData('<p>Describa el Testimonio</p>')
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
                <button className="submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default TestimonialsForm;