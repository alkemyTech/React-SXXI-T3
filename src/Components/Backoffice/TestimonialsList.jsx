import React from "react";
import BackofficeList from "./BackofficeList/BackofficeList";
import { provisionalBackofficeDeleteHandler } from "../../utils/backofficeDeleteHandler";
import { useBackofficeInfo } from "../../hooks/useBackofficeInfo";
import { BackofficeRender } from "./BackofficeRender";

export const TestimonialsList = () => {
  const [info, isFetching, setRefresh] = useBackofficeInfo("testimonials");

  const deleteHandler = (id) => {
    provisionalBackofficeDeleteHandler(
      id,
      "testimonials",
      "el testimonio",
      setRefresh
    );
  };

  return (
    <BackofficeRender isFetching={isFetching}>
      <BackofficeList
        deleteFunction={deleteHandler}
        title="Testimonios"
        createButonLabel="testimonio"
        tableData={info}
        tableHeader={["name", "image", "created_at"]}
        tableNames={["Título", "Imagen", "Creado en"]}
      />
    </BackofficeRender>
  );
};
