import { useState } from "react";
import debounce from "lodash.debounce";

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";

export const SlidesList = () => {
  const [search, setSearch] = useState("");
  const [info, isFetching, setRoute, setRefresh] = useBackofficeInfo("slides");

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);

    cleanValue.length >= 3 && setRoute(`slides?search=${cleanValue}`);
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();

    search.length < 3
      ? setRoute(() => "slides")
      : setRoute(`slides?search=${search}`);
  };

  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(
      id,
      "slides",
      "la diapositiva",
      setRefresh
    );
  };

  return (
    <>
      {isFetching ? null : (
        <BackofficeList
          deleteFunction={deleteHandler}
          title="Diapositiva"
          createButonLabel="diapositiva"
          tableData={info}
          tableHeader={["name", "image", "order"]}
          tableNames={["Titulo", "Imagen", "Orden"]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          placeholder={"Título de la diapositiva"}
        />
      )}
    </>
  );
};
