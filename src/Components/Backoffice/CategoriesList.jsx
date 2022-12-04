import { useState } from "react";
import debounce from "lodash.debounce";

import Swal from "sweetalert2";

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";

export const CategoriesList = () => {
    const [search, setSearch] = useState('');
    const [info, isFetching, setRoute] = useBackofficeInfo('categories');

    const handleChange = debounce((event) => {
        const { value } = event.target;
        const cleanValue = value.trim();

        setSearch(() => (cleanValue))

        cleanValue.length >= 3
            && setRoute(`categories?search=${cleanValue}`)

    }, 1000)

    const handleSubmit = (event) => {
        event.preventDefault();

        search.length < 3
            ? setRoute(() => ('categories'))
            : setRoute(`categories?search=${search}`)
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
                Swal.fire(
                    'Categoría borrada!',
                    '',
                    'success'
                )
            }
        })
    }

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
