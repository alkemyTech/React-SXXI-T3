import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../Button/Button";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from "sweetalert2";

import { apiONG } from "../../../Services/apiONG";

import styles from './organizationScreen.module.css'

const OrganizationScreen = () => {


    const [organizationInfo, setOrganizationInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiONG
            .get(`/organization`)
            .then(({ data: { data } }) => {
                setIsLoading(() => (false))
                setOrganizationInfo(() => (data))
            })
            .catch((error) => {
                setIsLoading(() => false)
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

    return (
        <>
            {
                isLoading
                    ? null
                    : (
                        <div className={styles.main_container}>
                            <h1>Información de la organización</h1>
                            <div className={styles.name_container}>
                                <h5>Nombre</h5>
                                <h2>{organizationInfo.name}</h2>
                            </div>
                            <div className={styles.logo_container}>
                                <h5>Logo</h5>
                            <img src={organizationInfo.logo} alt="logo" />
                            </div>
                            <div className={styles.description_container}>
                                <h5>Descripción</h5>
                                <div className={styles.editorStyles}>
                                    <CKEditor
                                    className={styles.ck}
                                        editor={ClassicEditor}
                                        disabled={true}
                                        config={{
                                            toolbar: [],
                                            removePlugins: [],
                                        }}
                                        data={organizationInfo.short_description}
                                    />
                                </div>
                            </div>
                            <Link to={`editar`} >
                                <Button label="Editar" />
                            </Link>
                        </div>
                    )
            }
        </>
    )
}

export default OrganizationScreen;