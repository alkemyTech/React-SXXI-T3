import { useState, useEffect } from 'react';
import { apiONG } from '../../../Services/apiONG';
import { errorAlert } from '../../Feedback/AlertService';

export const useBackofficeInfo = (path) => {
    const [route, setRoute] = useState(path)
    const [info, setInfo] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        apiONG
            .get(`/${route}`)
            .then(({ data: { data } }) => {
                setIsFetching(() => (false))
                setInfo(() => (data))
            })
            .catch((error) => {
                setIsFetching(() => (false))
                errorAlert();
            })
    }, [route])

    return [info, isFetching, setRoute]
}

