import {useEffect, useState} from "react";
import Swal from "sweetalert2";

import {apiONG} from "../Services/apiONG";

export const useLogo = () => {

    const [logoONG, setLogoONG] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        apiONG
            .get(`/organization`)
            .then(({ data: { data } }) => {
                setIsFetching(() => false)
                setLogoONG(() => (data.logo))
            })
            .catch((error) => {
                setIsFetching(() => (false))
                const errorMessage =
                    error?.response?.data?.message
                    || error.message;
                Swal.fire({
                    title: errorMessage,
                    icon: 'error',
                    timer: 5000
                })
            })
    }, [])

    return [logoONG, isFetching];
}