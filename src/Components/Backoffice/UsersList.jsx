import { useState } from "react";
import debounce from "lodash.debounce";

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";
import { BackofficeRender } from "./BackofficeRender";

export const UsersList = () => {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [info, isFetching, setRoute, setRefresh] = useBackofficeInfo("users");

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);

    if (cleanValue.length >= 3) {
      selectedRole !== `role=0`
        ? setRoute(`users?search=${cleanValue}&${selectedRole}`)
        : setRoute(`users?search=${cleanValue}`);
    }
  }, 1000);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedRole(() => `role=${value}`);
    if (search.length) {
      value !== "0"
        ? setRoute(() => `users?search=${search}&role=${value}`)
        : setRoute(() => `users?search=${search}`);
    } else {
      value !== "0"
        ? setRoute(() => `users?role=${value}`)
        : setRoute(() => `users`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.length) {
      selectedRole !== `role=0`
        ? setRoute(() => `users?search=${search}&${selectedRole}`)
        : setRoute(() => `users?search=${search}`);
    } else {
      selectedRole !== `role=0`
        ? setRoute(() => `users?${selectedRole}`)
        : setRoute(() => `users`);
    }
  };

  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(id, "users", "al usuario", setRefresh);
  };

  return (
    <BackofficeRender isFetching={isFetching}>
      <BackofficeList
        deleteFunction={deleteHandler}
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
    </BackofficeRender>
  );
};
