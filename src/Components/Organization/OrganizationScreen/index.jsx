import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../Button/Button";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import styles from "./organizationScreen.module.css";
import { apiOrganization } from "../../../Services/apiService";
import { errorAlert } from "../../Feedback/AlertService";

const OrganizationScreen = () => {
  const [organizationInfo, setOrganizationInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiOrganization
        .getAll()
        .then((response) => {
          setIsLoading(() => false);
          setOrganizationInfo(() => response);
        })
        .catch((error) => {
          setIsLoading(() => false);
          const errorMessage = error?.response?.data?.message || error.message;
          errorAlert(errorMessage);
        });
  }, []);

  return (
    <>
      {isLoading ? null : (
        <div className="main-container">
          <div className="form-container">
            <h1 className="form-title">Información de la organización</h1>
            <div className={styles.name_container}>
              <h5 className={styles.title_label}>Nombre</h5>
              <h2>{organizationInfo.name}</h2>
            </div>
            <div className={styles.logo_container}>
              <h5 className={styles.title_label}>Logo</h5>
              <img src={organizationInfo.logo} alt="logo" />
            </div>
            <div className={styles.description_container}>
              <h5 className={styles.title_label}>Descripción</h5>
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
            <Link to={`editar`}>
              <Button label="Editar" variant="primary" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizationScreen;
