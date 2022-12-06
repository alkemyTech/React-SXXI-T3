import { useState } from "react";
import debounce from "lodash.debounce";

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";

export const ActivitiesList = () => {
  const [search, setSearch] = useState("");
  const [info, isFetching, setRoute, setRefresh] = useBackofficeInfo("activities");

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);

    cleanValue.length >= 3 && setRoute(`activities?search=${cleanValue}`);
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();

    search.length < 3
      ? setRoute(() => "activities")
      : setRoute(`activities?search=${search}`);
  };


  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(
      id,
      "activities",
      "la actividad",
      setRefresh
    );
  };

  return (
    <>
      {isFetching ? null : (
        <BackofficeList
          deleteFunction={deleteHandler}
          title="Actividades"
          createButonLabel="actividad"
          tableData={info}
          tableHeader={["name", "image", "created_at"]}
          tableNames={["Título", "Imagen", "Creado en"]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          placeholder={"Título de la actividad"}
        />
      )}
    </>
  );
};
