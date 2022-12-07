import { useState } from 'react';
import debounce from 'lodash.debounce';

import Swal from 'sweetalert2';

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from './Hook';
import { apiMember } from '../../Services/apiService';
import { errorAlert } from '../Feedback/AlertService';

export const MembersList = () => {
    const [search, setSearch] = useState('');
    const [info, isFetching, setRoute] = useBackofficeInfo('members');

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
				apiMember.remove(id)
				.then(response => {
					Swal.fire(
						'Miembro borrado!',
						'',
						'success'
					)
				})
				.catch(error => errorAlert());
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
                        placeholder={'Nombre del miembro'}
                    />
            }
        </>
    )
}
