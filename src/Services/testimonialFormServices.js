import { apiONG } from './apiONG';
import Swal from 'sweetalert2';

export const onSubmitService = (testimonial, name, description, resetForm, setSubmitting) => {
    if (testimonial) {

        apiONG
            .put(`/categories/${testimonial.id}`, {
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
            .post(`/testimonial`, {
                name,
                description
            })
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