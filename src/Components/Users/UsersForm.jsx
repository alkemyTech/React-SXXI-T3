import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import {put, post} from '../../Services/userService' ;
import { useState, useEffect, useRef } from 'react';
import { apiONG } from '../../Services/apiONG';
import '../FormStyles.css';
import { InputField } from '../Form/InputField';

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
            setImagePreview(fileReader.result);

            if (id) {
                put(
                    id,
                    values.name,
                    values.email,
                    values.password,
                    fileReader.result,
                    values.role,
                    resetForm,
                    setSubmitting
                );
            }
            else {
                post(
                    values.name,
                    values.email,
                    values.password,
                    fileReader.result,
                    values.role,
                    resetForm,
                    setSubmitting
                );
            }
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
                    setValues(() => ({ ...data, image: '', role: data.role_id}));
                    setImagePreview(() => (data.profile_image));
                    setIsFetching(() => (false));
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
                <InputField
                    label="Nombre"
                    value={values.name}
                    name="name"
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    errors={errors.name}
                    touched={touched.name}
                    type="text"
                    placeholder="Escriba el nombre del usuario"
                />
                <InputField
                    label="Email"
                    value={values.email}
                    name="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    errors={errors.email}
                    touched={touched.email}
                    type="text"
                    placeholder="Escriba el email del usuario"
                />
                <InputField
                    label="Contraseña"
                    value={values.password}
                    name="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    errors={errors.password}
                    touched={touched.password}
                    type="password"
                    placeholder="Escriba la password del usuario"
                />
                <InputField
                    label="Agregar una imagen"
                    value={values.image}
                    name="image"
                    ref={imageRef}
                    onChange={handleChange("image")}
                    onBlur={handleBlur("image")}
                    errors={errors.image}
                    touched={touched.image}
                    type="file"
                />
                <div className='input-preview-image'>
                    {
                        id ?
                            (<div className='preview-container' style={{ backgroundImage: `url(${imagePreview})` }}>
                            </div>)
                            : null
                    }
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
                        <option value="2">
                            Regular
                        </option>
                        <option value="1">
                            Administrador
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