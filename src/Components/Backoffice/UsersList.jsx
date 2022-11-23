import { useState } from 'react';
import debounce from 'lodash.debounce';

import Swal from 'sweetalert2';

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from './Hook';

export const UsersList = () => {
	const [search, setSearch] = useState('users');
	const [info, isFetching, setRoute] = useBackofficeInfo(search);

	const handleChange = debounce((event) => {
		const { value } = event.target;
		const cleanValue = value.trim();

		setSearch(() => (cleanValue))

		cleanValue.length >= 3
			&& setRoute(`users?search=${cleanValue}`)

	}, 1000)

	const handleSubmit = (event) => {
		event.preventDefault();

		search.length < 3
			? setRoute(() => ('users'))
			: setRoute(`users?search=${search}`)
	}

	const deleteNewHandler = (id) => {
		Swal.fire({
			title: `Se procederá a borrar al usuario ${id}`,
			text: "Por favor, confirma",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Borrar',
			cancelButtonText: "Cancelar"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Usuario borrado!',
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
						deleteFunction={deleteNewHandler}
						title="Usuarios"
						createButonLabel="usuario"
						tableData={info}
						tableHeader={["name", "email"]}
						tableNames={["Nombre", "Email"]}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
			}
		</>
	)
}
