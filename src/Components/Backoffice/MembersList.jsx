import { useState } from "react";
import debounce from "lodash.debounce";

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";

export const MembersList = () => {
  const [search, setSearch] = useState("");
  const [info, isFetching, setRoute, setRefresh] = useBackofficeInfo("members");

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);

    cleanValue.length >= 3 && setRoute(`members?search=${cleanValue}`);
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();

    search.length < 3
      ? setRoute(() => "members")
      : setRoute(`members?search=${search}`);
  };

  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(
      id,
      "members",
      "al miembro",
      setRefresh
    );
  };

  return (
    <>
      {isFetching ? null : (
        <BackofficeList
          deleteFunction={deleteHandler}
          title="Miembros de la Organización"
          createButonLabel="miembro"
          tableData={info}
          tableHeader={["name", "image"]}
          tableNames={["Nombre", "Foto"]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          placeholder={"Nombre del miembro"}
        />
      )}
    </>
  );
};
