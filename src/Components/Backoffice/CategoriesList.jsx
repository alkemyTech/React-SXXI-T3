import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import debounce from 'lodash.debounce';

import Swal from 'sweetalert2';

import BackofficeList from "./BackofficeList/BackofficeList";
import { errorAlert } from '../Feedback/AlertService';
import { apiCategory } from '../../Services/apiService';
import { cleanInfo, getBackofficeInfo, selectBackoffice } from '../../features/backoffice/backofficeSlice';

export const CategoriesList = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const { isFetching, info } = useSelector(selectBackoffice);

    const handleChange = debounce((event) => {
        const { value } = event.target;
        const cleanValue = value.trim();

        setSearch(() => (cleanValue))
        !cleanValue.length && dispatch(getBackofficeInfo('categories'))
        cleanValue.length >= 3
            && dispatch(getBackofficeInfo(`categories?search=${cleanValue}`))

    }, 1000)

    const handleSubmit = (event) => {
        event.preventDefault();

        search.length < 3
            ? dispatch(getBackofficeInfo('categories'))
            : dispatch(getBackofficeInfo(`categories?search=${search}`))
    }

    const deleteCategoryHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar la categoría ${id}`,
            text: "Por favor, confirma",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrarla',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                apiCategory.remove(id)
                    .then(response => {
                        Swal.fire(
                            'Categoria borrada!',
                            '',
                            'success'
                        )
                    })
                    .catch(error => errorAlert())
            }
        })
    }

    useEffect(() => {
        dispatch(getBackofficeInfo('categories'));
        return () => (dispatch(cleanInfo()));
    }, [dispatch])

    return (
        <>
            {
                isFetching
                    ? null
                    : <BackofficeList
                        deleteFunction={deleteCategoryHandler}
                        title="Categorías"
                        createButonLabel="categoría"
                        tableData={info}
                        tableHeader={["name", "created_at"]}
                        tableNames={["Nombre", "Fecha de creación"]}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        placeholder={'Título de la categoría'}
                    />
            }
        </>
    )
}
