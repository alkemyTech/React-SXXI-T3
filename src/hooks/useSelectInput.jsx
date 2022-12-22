import {useEffect, useState} from 'react';
import {apiONG} from '../Services/apiONG';

import Swal from 'sweetalert2';

export const useSelectInput = (source) => {

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

    return { options };
}