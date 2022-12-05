import {useState} from "react";
import debounce from "lodash.debounce";

import Swal from "sweetalert2";

import BackofficeList from "./BackofficeList/BackofficeList";
import {useBackofficeInfo} from "../../hooks/useBackofficeInfo";


export const UsersList = () => {

	const [search, setSearch] = useState('');
	const [selectedRole, setSelectedRole] = useState('');
	const [info, isFetching, setRoute] = useBackofficeInfo('users');

	const handleChange = debounce((event) => {
		const { value } = event.target;
		const cleanValue = value.trim();

		setSearch(() => (cleanValue))

		if (cleanValue.length >= 3) {
			selectedRole !== `role=0`
				? setRoute(`users?search=${cleanValue}&${selectedRole}`)
				: setRoute(`users?search=${cleanValue}`)
		}

	}, 1000)

	const handleSelectChange = (event) => {
		const { value } = event.target
		setSelectedRole(() => (`role=${value}`))
		if (search.length) {
			value !== '0'
				? setRoute(() => (`users?search=${search}&role=${value}`))
				: setRoute(() => (`users?search=${search}`))
		} else {
			value !== '0'
				? setRoute(() => (`users?role=${value}`))
				: setRoute(() => (`users`))
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log({ search, selectedRole })
		if (search.length) {
			selectedRole !== `role=0`
				? setRoute(() => (`users?search=${search}&${selectedRole}`))
				: setRoute(() => (`users?search=${search}`))
		} else {
			selectedRole !== `role=0`
				? setRoute(() => (`users?${selectedRole}`))
				: setRoute(() => (`users`))
		}

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
						handleSelectChange={handleSelectChange}
						hasOptions={true}
						placeholder={'Nombre del usuario'}
						source={{
							route: null,
							externalResource: false,
							resource: [
								{ name: 'Todos los usuarios', role: '0' },
								{ name: 'Usuario Admin', role: 1 },
								{ name: 'Usuario Regular', role: 2 }
							]
						}}
					/>
			}
		</>
	)
}
