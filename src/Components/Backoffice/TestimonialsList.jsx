import React from "react";
import BackofficeList from "./BackofficeList/BackofficeList";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";

export const TestimonialsList = () => {
  const [info, isFetching, setRoute, setRefresh] =
    useBackofficeInfo("testimonials");

  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(
      id,
      "testimonials",
      "el testimonio",
      setRefresh
    );
  };

  return (
    <>
      {isFetching ? null : (
        <BackofficeList
          deleteFunction={deleteHandler}
          title="Testimonios"
          createButonLabel="testimonio"
          tableData={info}
          tableHeader={["name", "image", "created_at"]}
          tableNames={["Título", "Imagen", "Creado en"]}
        />
      )}
    </>
  );
};
