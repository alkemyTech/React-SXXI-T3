import { useState, useEffect } from 'react';
import { apiONG } from '../../Services/apiONG';

import Swal from 'sweetalert2';

import s from './selectInput.module.css';

const SelectInput = ({ source, handleSelectChange }) => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        source.externalResource
            ? apiONG
                .get(`/${source.route}`)
                .then(({ data: { data } }) => {
                    setOptions(() => ([{
                        name: 'Todas las categorías',
                        id: '6a5sd4'
                    }, ...data
                    ]))
                })
                .catch((error) => {
                    const errorMessage =
                        error?.response?.data?.message
                        || error.message;
                    Swal.fire({
                        title: errorMessage,
                        icon: 'error',
                        timer: 5000
                    })
                })
            : setOptions(() => (source.resource))

    }, [source])

    return (
        <select
            className={s["search-options"]}
            onChange={handleSelectChange}
        >
            {
                options
                    ? options.map((option) => (
                        <option
                            key={option.role || option.id}
                            value={option.role || option.name}
                        >{option.name}</option>
                    ))
                    : null
            }
        </select>
    )
}

export default SelectInput;