import { apiONG } from '../apiONG';
import Swal from 'sweetalert2';

export const onSubmitService = (
    id, name, description, facebookUrl, linkedinUrl, image, resetForm, setSubmitting
) => {
    if (id) {

        apiONG
            .put(`/members/${id}`, {
                name,
                facebookUrl,
                linkedinUrl,
                description,
                image
            })
            .then((response) => {
                const { data: { message } } = response;

                setSubmitting(false)
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

                setSubmitting(false)
                Swal.fire({
                    title: errorMessage,
                    icon: 'error',
                    timer: 5000
                })
            })

    } else {

        apiONG
            .post(`/members`, {
                name,
                facebookUrl,
                linkedinUrl,
                description,
                image
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
                        ? `Ya existe una categoría con ese nombre`
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