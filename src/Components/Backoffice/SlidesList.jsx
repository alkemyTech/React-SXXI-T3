import React from 'react';
import BackofficeList from "./BackofficeList/BackofficeList";
import Swal from 'sweetalert2';


export const SlidesList = () => {
    const slidesMock = [
      {
        "id": 1411,
        "name": "Juntos somos más",
        "description": "<p><strong>Sé parte de nuestra comunidad y cambiemos el mundo.</strong></p>",
        "image": "http://ongapi.alkemy.org/storage/Te269W7lKC.png",
        "order": 6,
        "user_id": null,
        "created_at": "2022-08-19T01:24:59.000000Z",
        "updated_at": "2022-11-15T22:31:35.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1412,
        "name": "Los niños son el futuro.",
        "description": "<p>Acompañemos a nuestros niños a construir un mejor futuro.</p>",
        "image": "http://ongapi.alkemy.org/storage/HjvFnkQSgV.png",
        "order": 2,
        "user_id": null,
        "created_at": "2022-08-19T01:42:20.000000Z",
        "updated_at": "2022-09-15T03:29:35.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1413,
        "name": "Exploremos nuevos horizontes",
        "description": "<p>Somos impulsores de nuevas experiencias.&nbsp;</p>",
        "image": "http://ongapi.alkemy.org/storage/AdEulUIBmO.png",
        "order": 3,
        "user_id": null,
        "created_at": "2022-08-19T01:45:51.000000Z",
        "updated_at": "2022-08-19T01:45:51.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1414,
        "name": "Cuidamos de vos.",
        "description": "<p>Queremos estar junto a vos, nuestra comunidad esta para apoyarte.</p>",
        "image": "http://ongapi.alkemy.org/storage/bvaTynsmk9.png",
        "order": 4,
        "user_id": null,
        "created_at": "2022-08-19T01:47:53.000000Z",
        "updated_at": "2022-08-19T01:47:53.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1434,
        "name": "Ayudemos al planeta",
        "description": "<p>Juntos podemos lograrlo</p>",
        "image": "http://ongapi.alkemy.org/storage/1xmQC2qjh5.jpeg",
        "order": 7,
        "user_id": 0,
        "created_at": "2022-09-23T09:36:39.000000Z",
        "updated_at": "2022-09-23T09:36:39.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1436,
        "name": "Prueba slide",
        "description": "<p>sdds</p>",
        "image": "http://ongapi.alkemy.org/storage/UcAbR3eeNp.jpeg",
        "order": -5,
        "user_id": 0,
        "created_at": "2022-10-03T18:20:04.000000Z",
        "updated_at": "2022-11-10T19:38:24.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1437,
        "name": "nueva prueba",
        "description": "<p>Esta es una prueba</p>",
        "image": "http://ongapi.alkemy.org/storage/GSaDSzeQf8.png",
        "order": 6,
        "user_id": null,
        "created_at": "2022-10-12T14:10:20.000000Z",
        "updated_at": "2022-10-13T20:29:56.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1438,
        "name": "arst",
        "description": "<p>bienvenido</p>",
        "image": null,
        "order": null,
        "user_id": null,
        "created_at": "2022-11-01T20:21:10.000000Z",
        "updated_at": "2022-11-01T20:21:10.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1439,
        "name": "arst",
        "description": "<p>arsarsa</p>",
        "image": null,
        "order": null,
        "user_id": null,
        "created_at": "2022-11-01T20:22:03.000000Z",
        "updated_at": "2022-11-01T20:22:03.000000Z",
        "deleted_at": null,
        "group_id": null
      },
      {
        "id": 1440,
        "name": "AAAA",
        "description": "BBBBBBBBBBBB",
        "image": null,
        "order": 0,
        "user_id": null,
        "created_at": "2022-11-02T17:51:40.000000Z",
        "updated_at": "2022-11-02T17:51:40.000000Z",
        "deleted_at": null,
        "group_id": null
      }
    ];

    const deleteNewHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar la diapositiva ${id}`,
            text: "Por favor, confirma",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText:"Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Diapositiva borrada!',
                '',
                'success'
              )
            }
          })
    }
    
  return (
    <BackofficeList
    deleteFunction={deleteNewHandler}
    title="Diapositiva"
    createButonLabel="diapositiva"
    tableData={slidesMock}
    tableHeader={["name", "image", "order"]}
    tableNames={["Titulo", "Imagen", "Orden"]}
    />
  )
}
