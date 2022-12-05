import {useState} from "react";
import debounce from "lodash.debounce";

import Swal from "sweetalert2";

import BackofficeList from "./BackofficeList/BackofficeList";
import {useBackofficeInfo} from "../../hooks/useBackofficeInfo";


export const ActivitiesList = () => {
	const [search, setSearch] = useState('');
	const [info, isFetching, setRoute] = useBackofficeInfo('activities');

	const handleChange = debounce((event) => {
		const { value } = event.target;
		const cleanValue = value.trim();

		setSearch(() => (cleanValue))

		cleanValue.length >= 3
			&& setRoute(`activities?search=${cleanValue}`)

	}, 1000)

	const handleSubmit = (event) => {
		event.preventDefault();

		search.length < 3
			? setRoute(() => ('activities'))
			: setRoute(`activities?search=${search}`)
	}

	const deleteActivityHandler = (id) => {
		Swal.fire({
			title: `Se procederá a borrar la actividad ${id}`,
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
					'Actividad borrada!',
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
						deleteFunction={deleteActivityHandler}
						title="Actividades"
						createButonLabel="actividad"
						tableData={info}
						tableHeader={["name", "image", "created_at"]}
						tableNames={["Título", "Imagen", "Creado en"]}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						placeholder={'Título de la actividad'}
					/>
			}
		</>
	)
}
