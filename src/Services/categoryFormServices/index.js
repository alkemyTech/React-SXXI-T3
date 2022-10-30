import { apiONG } from '../apiONG';
import Swal from 'sweetalert2';

export const onSubmitService = (category, name, description, resetForm) => {
    if (category) {

        apiONG
            .put(`/categories/${category.id}`, {
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
            });

    } else {

        apiONG
            .post(`/categories`, {
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
                    ? `Category's name alredy exists`
                    : error.message;

                Swal.fire({
                    title: errorMessage,
                    icon: 'error',
                    timer: 5000
                })
            })
    }
}