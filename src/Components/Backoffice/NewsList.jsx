import { useState } from "react";
import debounce from "lodash.debounce";

import BackofficeList from "./BackofficeList/BackofficeList";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";
import { BackofficeRender } from "./BackofficeRender";

export const NewsList = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [info, isFetching, setRoute, setRefresh] = useBackofficeInfo("news");

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);

    if (cleanValue.length >= 3) {
      selectedCategory !== "category=Todas las categorías"
        ? setRoute(`news?search=${cleanValue}&${selectedCategory}`)
        : setRoute(`news?search=${cleanValue}`);
    }
  }, 1000);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedCategory(() => `category=${value}`);
    if (search.length) {
      value !== "Todas las categorías"
        ? setRoute(() => `news?search=${search}&category=${value}`)
        : setRoute(() => `news?search=${search}`);
    } else {
      value !== "Todas las categorías"
        ? setRoute(() => `news?category=${value}`)
        : setRoute(() => `news`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.length) {
      selectedCategory !== "category=Todas las categorías"
        ? setRoute(() => `news?search=${search}&${selectedCategory}`)
        : setRoute(() => `news?search=${search}`);
    } else {
      selectedCategory !== "category=Todas las categorías"
        ? setRoute(() => `news?${selectedCategory}`)
        : setRoute(() => `news`);
    }
  };

  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(id, "news", "la novedad", setRefresh);
  };

  return (
    <BackofficeRender isFetching={isFetching}>
      <BackofficeList
        deleteFunction={deleteHandler}
        title="Novedades"
        createButonLabel="novedad"
        tableData={info}
        tableHeader={["name", "image", "created_at"]}
        tableNames={["Título", "Imagen", "Creado en"]}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSelectChange={handleSelectChange}
        hasOptions={true}
        placeholder={"Título de la novedad"}
        source={{
          route: "categories",
          externalResource: true,
          resource: null,
        }}
      />
    </BackofficeRender>
  );
};
