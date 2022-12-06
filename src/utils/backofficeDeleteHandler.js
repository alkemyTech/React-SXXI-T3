import {
  confirmAlert,
  errorAlert,
  infoAlert,
} from "../Components/Feedback/AlertService";
import { apiUser } from "../Services/apiService";
import { apiONG } from "../Services/apiONG";

export const backofficeDeleteHandler = (
  id,
  api,
  deleteHelper,
  titleMessage
) => {
  const deleter = async () => {
    try {
      await apiUser.remove(id);
      infoAlert(`Borrado realizado con éxito!`, "");
    } catch (e) {
      console.log(e);
      errorAlert(`Error al borrar ${titleMessage}!`, "");
    }
  };
  confirmAlert(
    `Desea borrar ${titleMessage} ${id}?`,
    "Por favor, confirmar",
    deleter,
    () => {}
  );
};

export const provisionalBackofficeDeleteHandler = (
  id,
  apiUrl,
  deleteHelper,
  titleMessage
) => {
  const deleter = async () => {
    try {
      await apiONG.delete(`/${apiUrl}/${id}`);
      infoAlert(`Borrado realizado con éxito!`, "");
      deleteHelper(id);
    } catch (e) {
      errorAlert(`Error al borrar ${titleMessage}!`, "");
    }
  };
  confirmAlert(
    `Desea borrar ${titleMessage} ${id}?`,
    "Por favor, confirmar",
    deleter,
    () => {}
  );
};
