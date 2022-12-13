import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { apiNews } from "../../Services/apiService";
import { errorAlert } from "../Feedback/AlertService";
import BackofficeList from "./BackofficeList/BackofficeList";

import { useDispatch, useSelector } from "react-redux";
import {
	getBackofficeInfo, selectBackoffice
} from "../../features/backoffice/backofficeSlice";

export const NewsList = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { info, isFetching} = useSelector(selectBackoffice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBackofficeInfo("news"));
  }, [dispatch]);

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);
    !cleanValue.length && dispatch(getBackofficeInfo("news"));
    if (cleanValue.length >= 3) {
      selectedCategory !== "category=Todas las categorías"
        ? dispatch(getBackofficeInfo(`news?search=${cleanValue}&${selectedCategory}`))
        : dispatch(getBackofficeInfo(`news?search=${cleanValue}`));
    }
  }, 1000);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedCategory(() => `category=${value}`);
    if (search.length) {
      value !== "Todas las categorías"
        ? dispatch(getBackofficeInfo(() => `news?search=${search}&category=${value}`))
        : dispatch(getBackofficeInfo(() => `news?search=${search}`));
    } else {
      value !== "Todas las categorías"
        ? dispatch(getBackofficeInfo(() => `news?category=${value}`))
        : dispatch(getBackofficeInfo(() => `news`));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.length) {
      selectedCategory !== "category=Todas las categorías"
        ? dispatch(getBackofficeInfo(() => `news?search=${search}&${selectedCategory}`))
        : dispatch(getBackofficeInfo(() => `news?search=${search}`));
    } else {
      selectedCategory !== "category=Todas las categorías"
        ? dispatch(getBackofficeInfo(() => `news?${selectedCategory}`))
        : dispatch(getBackofficeInfo(() => `news`));
    }
  };

  const deleteNewHandler = (id) => {
    Swal.fire({
      title: `Se procederá a borrar la novedad ${id}`,
      text: "Por favor, confirma",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrarla",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        apiNews
          .remove(id)
          .then((response) => {
            Swal.fire("Novedad borrado!", "", "success");
          })
          .catch((error) => errorAlert());
      }
    });
  };

  return (
    <>
      {isFetching ? null : (
        <BackofficeList
          deleteFunction={deleteNewHandler}
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
      )}
    </>
  );
};
