import { useState } from "react";
import debounce from "lodash.debounce";

import Swal from "sweetalert2";

import BackofficeList from "./BackofficeList/BackofficeList";
import { apiUser } from "../../Services/apiService";
import { errorAlert } from "../Feedback/AlertService";
import {
  cleanInfo,
  getBackofficeInfo,
  selectBackoffice,
} from "../../features/backoffice/backofficeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const UsersList = () => {
  const route = "users";
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { info, isFetching } = useSelector(selectBackoffice);
  const dispatch = useDispatch();

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);
    !cleanValue.length && dispatch(getBackofficeInfo(route));
    if (cleanValue.length >= 3) {
      selectedRole !== `role=0`
        ? dispatch(
            getBackofficeInfo(`${route}?search=${cleanValue}&${selectedRole}`)
          )
        : dispatch(getBackofficeInfo(`${route}?search=${cleanValue}`));
    }
  }, 1000);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedRole(() => `role=${value}`);
    if (search.length) {
      value !== "0"
        ? dispatch(
            getBackofficeInfo(() => `${route}?search=${search}&role=${value}`)
          )
        : dispatch(getBackofficeInfo(() => `${route}?search=${search}`));
    } else {
      value !== "0"
        ? dispatch(getBackofficeInfo(() => `${route}?role=${value}`))
        : dispatch(getBackofficeInfo(() => route));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length) {
      selectedRole !== `role=0`
        ? dispatch(
            getBackofficeInfo(() => `${route}?search=${search}&${selectedRole}`)
          )
        : dispatch(getBackofficeInfo(() => `${route}?search=${search}`));
    } else {
      selectedRole !== `role=0`
        ? dispatch(getBackofficeInfo(() => `${route}?${selectedRole}`))
        : dispatch(getBackofficeInfo(() => route));
    }
  };

  const deleteNewHandler = (id) => {
    Swal.fire({
      title: `Se procederá a borrar al usuario ${id}`,
      text: "Por favor, confirma",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        apiUser
          .remove(id)
          .then((response) => {
            Swal.fire("Usuario borrado!", "", "success");
          })
          .catch((error) => errorAlert());
      }
    });
  };

  useEffect(() => {
    dispatch(getBackofficeInfo(route));
    return () => dispatch(cleanInfo());
  }, [dispatch]);

  return (
    <>
      {isFetching ? null : (
        <BackofficeList
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
          placeholder={"Nombre del usuario"}
          source={{
            route: null,
            externalResource: false,
            resource: [
              { name: "Todos los usuarios", role: "0" },
              { name: "Usuario Admin", role: 1 },
              { name: "Usuario Regular", role: 2 },
            ],
          }}
        />
      )}
    </>
  );
};
