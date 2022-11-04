import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { onSubmitService } from '../../Services/userService';
import { useState, useEffect, useRef } from 'react';
import { apiONG } from '../../Services/apiONG';
import '../FormStyles.css';

const UsersForm = () => {
    const { id } = useParams();
    const imageRef = useRef();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        image: '',
        role: '2'
    };

    const jpgRegExp = /\.(jpe?g|png)$/i;

    const requiredMessage = `es un campo requerido`

    const [imagePreview, setImagePreview] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup
                .string()
                .min(4, 'El nombre debe tener 4 caracteres como mínimo')
                .required(`El nombre ${requiredMessage}`),
            email: Yup
                .string()
                .email("El email debe contener @ y extension .com u otra")
                .required(`El email ${requiredMessage}`),
            password: Yup
                .string()
                .min(8, "La contraseña debe tener minimo 8 caracteres")
                .required(`La contraseña ${requiredMessage}`),
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
            console.log(
                id,
                    values.name,
                    values.email,
                    values.password,
                    fileReader.result,
                    values.role
            )
            setImagePreview(fileReader.result)
            onSubmitService(
                id,
                values.name,
                values.email,
                values.password,
                fileReader.result,
                values.role,
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
                .get(`/users/${id}`)
                .then(({ data: { data } }) => {
                    console.log(data);
                    setValues(() => ({ ...data, image: '', }))
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
                <h1 className='form-title'>Formulario de {id ? "Edición" : "Creación"} de Usuario</h1>
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
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba el nombre del usuario"
                    />
                    <div className='form-error'>
                        {errors.name && touched.name && <span>{errors.name}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputEmail'
                    >
                        Email
                    </label>
                    <input
                        id='inputEmail'
                        className="input-field"
                        type="text"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba el email del Usuario"
                    />
                    <div className='form-error'>
                        {errors.email && touched.email && <span>{errors.email}</span>}
                    </div>
                </div>
                <div className='input-label-container'>
                    <label
                        htmlFor='inputPassword'
                    >
                        Contraseña
                    </label>
                    <input
                        id='inputPassword'
                        className="input-field"
                        type="password"
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Escriba la contraseña del Usuario"
                    />
                    <div className='form-error'>
                        {errors.password && touched.password && <span>{errors.email}</span>}
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
                    <div className='input-preview-image'>
                        {
                            id ?
                                (<div className='preview-container' style={{ backgroundImage: `url(${imagePreview})` }}>
                                </div>)
                                : null
                        }
                    </div>
                </div>
                <div className='input-label-container'>
                    <label htmlFor='inputRole'>
                        Selecciona un rol
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={values.role}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        <option value="2">Regular
                        </option>
                        <option value="1">Administrador
                        </option>
                        
                    </select>
                    <div className='form-error'>
                        {errors.role && touched.role && <span>{errors.role}</span>}
                    </div>
                </div>

                <button className="submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default UsersForm;