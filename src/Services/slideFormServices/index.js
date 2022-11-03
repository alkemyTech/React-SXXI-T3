import { apiONG } from '../apiONG';
import Swal from 'sweetalert2';

export const onSubmitService = (id, name, description, imageBase64, order, resetForm, setSubmitting) => {
    console.log(id);
    if (id) {
        console.log(imageBase64);
        apiONG
            .put(`/slides/${id}`, {
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
        const body = {
            name: name,
            description: description,
            image: imageBase64,
            order: order
        };
        console.log(body);
        apiONG
            .post(`/slides`, body)
            .then((response) => {
                const { data: { message } } = response;
                console.log(response);
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