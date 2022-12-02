import { useState } from 'react';
import debounce from 'lodash.debounce';

import Swal from 'sweetalert2';

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from './Hook';
import { errorAlert } from '../Feedback/AlertService';
import { apiSlide } from '../../Services/apiService';

export const SlidesList = () => {
	const [search, setSearch] = useState('');
	const [info, isFetching, setRoute] = useBackofficeInfo('slides');

	const handleChange = debounce((event) => {
		const { value } = event.target;
		const cleanValue = value.trim();

		setSearch(() => (cleanValue))

		cleanValue.length >= 3
			&& setRoute(`slides?search=${cleanValue}`)

	}, 1000)

	const handleSubmit = (event) => {
		event.preventDefault();

		search.length < 3
			? setRoute(() => ('slides'))
			: setRoute(`slides?search=${search}`)
	}

	const deleteNewHandler = (id) => {
		Swal.fire({
			title: `Se procederá a borrar la diapositiva ${id}`,
			text: "Por favor, confirma",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Borrar',
			cancelButtonText: "Cancelar"
		}).then((result) => {
			if (result.isConfirmed) {
				apiSlide.remove(id)
				.then(response => {
					Swal.fire(
						'Diapositiva borrado!',
						'',
						'success'
					)
				})
				.catch(error => errorAlert())
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
						title="Diapositiva"
						createButonLabel="diapositiva"
						tableData={info}
						tableHeader={["name", "image", "order"]}
						tableNames={["Titulo", "Imagen", "Orden"]}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						placeholder={'Título de la diapositiva'}
					/>
			}
		</>
	)
}
