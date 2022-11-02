import { apiONG } from '../apiONG';
import Swal from 'sweetalert2';

export const onSubmitService = (slide, name, description, order, resetForm, setSubmitting) => {
    if (slide) {

        apiONG
            .put(`/slides/${slide.id}`, {
                name,
                description,
                order
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
            .post(`/slides`, {
                name,
                description,
                order
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
                        ? `Ya existe una Slide con ese nombre`
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