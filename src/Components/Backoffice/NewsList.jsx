import React from "react";
import BackofficeList from "./BackofficeList/BackofficeList";
import Swal from "sweetalert2";

export const NewsList = () => {
  const mockedNews = [
    {
      id: 2484,
      name: "Prueba api Novedad",
      slug: null,
      content: "<p>weww</p>",
      image: "http://ongapi.alkemy.org/storage/15MTbMDEXf.png",
      user_id: null,
      category_id: 2516,
      created_at: "2022-11-04T18:56:21.000000Z",
      updated_at: "2022-11-04T18:56:21.000000Z",
      deleted_at: null,
      group_id: null,
    },
    {
      id: 2485,
      name: "Prueba api Novedad",
      slug: null,
      content: "<p>weww</p>",
      image: "http://ongapi.alkemy.org/storage/DNdBCDyCtX.png",
      user_id: null,
      category_id: 2433,
      created_at: "2022-11-04T18:58:54.000000Z",
      updated_at: "2022-11-04T18:58:54.000000Z",
      deleted_at: null,
      group_id: null,
    },
    {
      id: 2486,
      name: "Prueba api Novedad",
      slug: null,
      content: "<p>weww</p>",
      image: "http://ongapi.alkemy.org/storage/R9LfBgs7SP.png",
      user_id: null,
      category_id: 2432,
      created_at: "2022-11-04T19:25:35.000000Z",
      updated_at: "2022-11-04T19:25:35.000000Z",
      deleted_at: null,
      group_id: null,
    },
    {
      id: 2487,
      name: "Prueba api Novedad",
      slug: null,
      content: "<p>weww</p>",
      image: "http://ongapi.alkemy.org/storage/Nbmaxw6MG5.png",
      user_id: null,
      category_id: 2432,
      created_at: "2022-11-04T19:26:45.000000Z",
      updated_at: "2022-11-04T19:26:45.000000Z",
      deleted_at: null,
      group_id: null,
    },
    {
      id: 2488,
      name: "Prueba api Novedad",
      slug: null,
      content: "<p>weww</p>",
      image: "http://ongapi.alkemy.org/storage/iRD7K2kyrh.png",
      user_id: null,
      category_id: 2432,
      created_at: "2022-11-04T19:29:58.000000Z",
      updated_at: "2022-11-04T19:29:58.000000Z",
      deleted_at: null,
      group_id: null,
    },
    {
      id: 2489,
      name: "Prueba api Novedad",
      slug: null,
      content: "<p>weww</p>",
      image: "http://ongapi.alkemy.org/storage/tKEy0FfWoW.png",
      user_id: null,
      category_id: 2432,
      created_at: "2022-11-04T19:32:21.000000Z",
      updated_at: "2022-11-04T19:32:21.000000Z",
      deleted_at: null,
      group_id: null,
    },
    {
      id: 2490,
      name: "Probando un viernes a la noche",
      slug: null,
      content: "<p>A ver qué onda</p>",
      image: "http://ongapi.alkemy.org/storage/C7Pc7dKHTz.png",
      user_id: null,
      category_id: 2517,
      created_at: "2022-11-04T23:03:53.000000Z",
      updated_at: "2022-11-04T23:03:53.000000Z",
      deleted_at: null,
      group_id: null,
    },
  ];

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
        Swal.fire("Novedad borrada!", "", "success");
      }
    });
  };

  return (
    <BackofficeList
      deleteFunction={deleteNewHandler}
      title="Novedades"
      createButonLabel="novedad"
      tableData={mockedNews}
      tableHeader={["name", "image", "created_at"]}
      tableNames={["Título", "Imagen", "Creado en"]}
    />
  );
};
