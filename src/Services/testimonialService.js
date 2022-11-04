import { apiONG } from './apiONG';
import Swal from 'sweetalert2';

export const onSubmitService = (id, name, description, imageBase64, resetForm, setSubmitting) => {
    const body = {
        name:name,
        description:description,
        image:imageBase64
    };
    if (id) {
        apiONG
            .put(`/testimonials/${id}`, {
                name,
                description
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
            .post(`/testimonials`, body)
            .then((response) => {
                const { data: { message } } = response;
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
                        ? `Ya existe un Testimonio con ese nombre`
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