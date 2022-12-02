import { useState, useEffect } from 'react';
import { apiONG } from '../../../Services/apiONG';

import { errorAlert } from '../../Feedback/AlertService';

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
                    errorAlert();
                })
            : setOptions(() => (source.resource))

    }, [source])

    return { options };
}