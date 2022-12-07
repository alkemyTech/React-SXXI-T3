import { useState, useEffect } from "react";

import { apiOrganization } from "../../../Services/apiService";
import { errorAlert } from "../../Feedback/AlertService";

export const useLogo = () => {

    const [logoONG, setLogoONG] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        apiOrganization
            .getAll()
            .then((response) => {
                setIsFetching(false)
                setLogoONG(response.logo)
            })
            .catch((error) => {
                setIsFetching(false)
                const errorMessage =
                    error?.response?.data?.message
                    || error.message;
                errorAlert(errorMessage)
            })
    }, [])

    return [logoONG, isFetching];
}