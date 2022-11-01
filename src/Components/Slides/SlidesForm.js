import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { onSubmitService } from '../../Services/slideFormServices';

import '../FormStyles.css';
import './SlidesForm.css';

const SlidesForm = ({ slide }) => {

    const newSlide = {
        name: '',
        description: '',
        image: ''
    }

    const existentSlide = {
        name: slide?.name,
        description: slide?.description,
        image: ''
    }

    const initialValues = slide ? existentSlide : newSlide;

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
        onSubmitService(
            slide,
            name,
            description,
            resetForm,
            setSubmitting
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
        isSubmitting,
        setSubmitting,
        resetForm,
        values: { name, description, image },
        touched: { name: touchedName, description: touchedDescription, image: touchedImage },
        errors: { name: errorName, description: errorDescription, image: errorImage }
    } = formik;

    return (
        <div className={
            isSubmitting ? 'slidesContainer pulse' : 'slidesContainer'
        }>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className='slidesForm-Title'>Formulario de Slides</h1>
                <div className='input-label-contariner'>
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
                        placeholder="Escriba el título de la Slide"
                    />
                    <div className='slidesForm-errorContainer'>
                        {errorName && touchedName && <span>{errorName}</span>}
                    </div>
                </div>
                <div className='input-label-contariner'>
                    <label>
                        Descripción
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={description ? description : '<p>Describa la Slide</p>'}
                        onFocus={(event, editor) => {
                            editor.setData(description)
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            if (data !== '<p>Describa la Slide</p>') {
                                setFieldValue('description', data)
                            }
                        }}
                        onBlur={(event, editor) => {
                            setFieldTouched('description')
                            const data = editor.getData();
                            !data && editor.setData('<p>Describa la Slide</p>')
                        }}
                    />
                    <div className='slidesForm-errorContainer'>
                        {errorDescription && touchedDescription && <span>{errorDescription}</span>}
                    </div>
                </div>
                <div className='input-label-contariner'>
                    <label
                        htmlFor='inputImage'
                    >
                        Agregar una imagen
                    </label>

                    <input
                        type="file"
                        name="image"
                        id='inputImage'
                        className="input-field"
                        value={image}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <div className='slidesForm-errorContainer'>
                        {errorImage && touchedImage && <span>{errorImage}</span>}
                    </div>
                </div>
                <button className="submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default SlidesForm;