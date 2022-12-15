import {useEffect, useState} from 'react';
import debounce from 'lodash.debounce';

import Swal from 'sweetalert2';

import BackofficeList from "./BackofficeList/BackofficeList";
import { apiActivity } from '../../Services/apiService';
import { errorAlert } from '../Feedback/AlertService';
import {cleanInfo, getBackofficeInfo, selectBackoffice} from "../../features/backoffice/backofficeSlice";
import {useDispatch, useSelector} from "react-redux";

export const ActivitiesList = () => {
	const route = 'activities';
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const { isFetching, info } = useSelector(selectBackoffice);

	const handleChange = debounce((event) => {
		const { value } = event.target;
		const cleanValue = value.trim();
		setSearch(() => (cleanValue))
		!cleanValue.length && dispatch(getBackofficeInfo(route))
		cleanValue.length >= 3
		&& dispatch(getBackofficeInfo(`${route}?search=${cleanValue}`))
	}, 1000)

	const handleSubmit = (event) => {
		event.preventDefault();
		search.length < 3
		? dispatch(getBackofficeInfo(route))
		: dispatch(getBackofficeInfo(`${route}?search=${search}`))
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
				apiActivity.remove(id)
				.then(response => {
					Swal.fire(
						'Actividad borrada!',
						'',
						'success'
					)
				})
				.catch(error => errorAlert())
			}
		})
	}

	useEffect(() => {
		dispatch(getBackofficeInfo(route));
		return () => (dispatch(cleanInfo()));
	}, [dispatch])

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
