import { useState } from 'react';
import debounce from 'lodash.debounce';

import Swal from 'sweetalert2';

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from './Hook';

export const MembersList = () => {
    const [search, setSearch] = useState('members');
    const [info, isFetching, setRoute] = useBackofficeInfo(search);

    const handleChange = debounce((event) => {
        const { value } = event.target;
        const cleanValue = value.trim();

        setSearch(() => (cleanValue))

        cleanValue.length >= 3
            && setRoute(`members?search=${cleanValue}`)

    }, 1000)

    const handleSubmit = (event) => {
        event.preventDefault();

        search.length < 3
            ? setRoute(() => ('members'))
            : setRoute(`members?search=${search}`)
    }

    const deleteMemberHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar al miembro ${id}`,
            text: "Por favor, confirma",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrarlo',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Miembro borrado!',
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
                        deleteFunction={deleteMemberHandler}
                        title="Miembros de la Organización"
                        createButonLabel="miembro"
                        tableData={info}
                        tableHeader={["name", "image"]}
                        tableNames={["Nombre", "Foto"]}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
            }
        </>
    )
}
