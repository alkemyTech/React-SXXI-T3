import { apiONG } from './apiONG';
import Swal from 'sweetalert2';

export const onSubmitService = (id, name, email, password, profilePhoto, role, resetForm, setSubmitting) => {
    if (id) {
        console.log(profilePhoto)
        apiONG
            .put(`/users/${id}`, {
                name : name, 
                email : email, 
                password : password, 
                profile_image : profilePhoto, 
                role_id : role
            })
            .then((response) => {
                const { data: { message } } = response;

                return Swal.fire({
                    title: message,
                    icon: 'success',
                    timer: 3000
                })
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
            .finally(() => {
                setSubmitting(false)
            })

    } else {

        apiONG
            .post(`/users`, {
                name : name, 
                email : email, 
                password : password, 
                profile_image : profilePhoto, 
                role_id : role
            })
            .then((response) => {
                const { data: { message } } = response;
                console.log(response.data)
                Swal.fire({
                    title: message,
                    icon: 'success',
                    timer: 3000
                })
                return resetForm();
            })
            .catch((error) => {
                const errorMessage =
                    error?.response?.data?.message
                        ? `Ya existe un usuario con ese nombre`
                        : error.message;

                Swal.fire({
                    title: errorMessage,
                    icon: 'error',
                    timer: 5000
                })
            })
            .finally(() => {
                setSubmitting(false)
            })
    }
}