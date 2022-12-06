import { useState } from "react";
import debounce from "lodash.debounce";

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";

export const CategoriesList = () => {
  const [search, setSearch] = useState("");
  const [info, isFetching, setRoute, setInfo] = useBackofficeInfo("categories");

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);

    cleanValue.length >= 3 && setRoute(`categories?search=${cleanValue}`);
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();

    search.length < 3
      ? setRoute(() => "categories")
      : setRoute(`categories?search=${search}`);
  };

  const deleteHelper = (id) => {
    setInfo((prevInfo) => prevInfo.filter((obj) => obj.id !== id));
  };

  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(
      id,
      "categories",
      deleteHelper,
      "la categoría"
    );
  };

  return (
    <>
      {isFetching ? null : (
        <BackofficeList
          deleteFunction={deleteHandler}
          title="Categorías"
          createButonLabel="categoría"
          tableData={info}
          tableHeader={["name", "created_at"]}
          tableNames={["Nombre", "Fecha de creación"]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          placeholder={"Título de la categoría"}
        />
      )}
    </>
  );
};
