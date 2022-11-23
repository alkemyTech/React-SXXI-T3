import { useState } from 'react';
import debounce from 'lodash.debounce';

import Swal from 'sweetalert2';

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from './Hook';

export const NewsList = () => {
	const [search, setSearch] = useState('news');
	const [info, isFetching, setRoute] = useBackofficeInfo(search);

	const handleChange = debounce((event) => {
		const { value } = event.target;
		const cleanValue = value.trim();

		setSearch(() => (cleanValue))

		cleanValue.length >= 3
			&& setRoute(`news?search=${cleanValue}`)

	}, 1000)

	const handleSubmit = (event) => {
		event.preventDefault();

		search.length < 3
			? setRoute(() => ('news'))
			: setRoute(`news?search=${search}`)
	}

	const deleteNewHandler = (id) => {
		Swal.fire({
			title: `Se procederá a borrar la novedad ${id}`,
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
					'Novedad borrada!',
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
						title="Novedades"
						createButonLabel="novedad"
						tableData={info}
						tableHeader={["name", "image", "created_at"]}
						tableNames={["Título", "Imagen", "Creado en"]}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
			}
		</>
	)
}
