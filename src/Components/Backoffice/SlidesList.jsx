import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import BackofficeList from "./BackofficeList/BackofficeList";
import { errorAlert } from "../Feedback/AlertService";
 import { apiSlide } from "../../Services/apiService";
import { useDispatch, useSelector } from "react-redux";


import {
  getBackofficeInfo,
  selectBackoffice,
} from '../../features/backoffice/backofficeSlice'

export const SlidesList = () => {
  const [search, setSearch] = useState("");
  const { info, isFetching } = useSelector(selectBackoffice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBackofficeInfo("slides"));
  }, [dispatch]);

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => cleanValue);
    !cleanValue.length && dispatch(getBackofficeInfo("slides"));
    cleanValue.length >= 3 &&
      dispatch(getBackofficeInfo(`slides?search=${cleanValue}`));
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();

    search.length < 3
      ? dispatch(getBackofficeInfo("slides"))
      : dispatch(getBackofficeInfo(`slides?search=${search}`));
  };

  const deleteNewHandler = (id) => {
    Swal.fire({
      title: `Se procederá a borrar la diapositiva ${id}`,
      text: "Por favor, confirma",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        apiSlide
          .remove(id)
          .then((response) => {
            Swal.fire("Diapositiva borrado!", "", "success");
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
