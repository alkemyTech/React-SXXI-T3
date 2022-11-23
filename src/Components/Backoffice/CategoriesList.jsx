import React from 'react';
import BackofficeList from "./BackofficeList/BackofficeList";
import Swal from 'sweetalert2';


export const CategoriesList = () => {
  const mockedCategories = [
      {
          "id": 2438,
          "name": "una Categoría 5",
          "description": "<p>Una nueva descripcion</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-10-28T19:12:12.000000Z",
          "updated_at": "2022-10-28T19:12:12.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2446,
          "name": "una Categoría 6",
          "description": "<p>Una Descripcion muy interesante</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-10-28T19:40:52.000000Z",
          "updated_at": "2022-10-28T19:40:52.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2449,
          "name": "una Categoría 7",
          "description": "<p>Una Descripcion muy interesante</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-10-28T21:32:39.000000Z",
          "updated_at": "2022-10-28T21:32:39.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2455,
          "name": "una Categoria 10",
          "description": "<p>asdasdasd</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-10-29T18:14:19.000000Z",
          "updated_at": "2022-10-29T18:14:19.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2457,
          "name": "una Categoría 15",
          "description": "<p>Una Descripcion muy interesante</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-10-29T18:46:31.000000Z",
          "updated_at": "2022-10-29T18:46:31.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2460,
          "name": "una Categoria 20",
          "description": "<p>asd</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-10-29T23:59:38.000000Z",
          "updated_at": "2022-10-29T23:59:38.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2504,
          "name": "una Categoría 200",
          "description": "<p>asdasd</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-10-30T05:51:16.000000Z",
          "updated_at": "2022-10-30T05:51:16.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2516,
          "name": "Desarrollo de sistemas",
          "description": "<p>Phyton</p>",
          "image": "http://ongapi.alkemy.org/storage/MN4z4Lykfi.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-02T17:22:18.000000Z",
          "updated_at": "2022-11-02T17:22:18.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2517,
          "name": "Javascript",
          "description": "<p>Curso de React</p>",
          "image": "http://ongapi.alkemy.org/storage/gtsRUq0zx3.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-02T17:37:57.000000Z",
          "updated_at": "2022-11-17T23:51:55.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2518,
          "name": "Javascript, Tailwind",
          "description": "<p>Curso de React native</p>",
          "image": "http://ongapi.alkemy.org/storage/k69vFRCp8p.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-02T17:43:28.000000Z",
          "updated_at": "2022-11-02T17:43:28.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2521,
          "name": "aaaaaaarsarsarsars",
          "description": "<p>bbbbbbbbb</p>",
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-11-02T19:11:13.000000Z",
          "updated_at": "2022-11-02T19:11:13.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2522,
          "name": "PEPERONIIIIII",
          "description": null,
          "image": null,
          "parent_category_id": null,
          "created_at": "2022-11-02T22:11:22.000000Z",
          "updated_at": "2022-11-02T22:11:22.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2524,
          "name": "java",
          "description": "<p>programacion orientada a objetos</p>",
          "image": "http://ongapi.alkemy.org/storage/BrjJN5pbXV.png",
          "parent_category_id": null,
          "created_at": "2022-11-04T05:09:22.000000Z",
          "updated_at": "2022-11-04T05:09:22.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2525,
          "name": "una categoria 21",
          "description": "<p>Descripción de la categoría</p>",
          "image": "http://ongapi.alkemy.org/storage/KkLnjATDTF.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-04T19:33:53.000000Z",
          "updated_at": "2022-11-04T19:33:53.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2527,
          "name": "Programacion .Net",
          "description": "<p>Desarrollo de aplicaciones web y mobile</p>",
          "image": "http://ongapi.alkemy.org/storage/0LiJA0yDQg.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-06T03:40:00.000000Z",
          "updated_at": "2022-11-06T03:40:00.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2528,
          "name": "Programacion PHP",
          "description": "<p>Desarrollo BackEnd</p>",
          "image": "http://ongapi.alkemy.org/storage/d6ReEEIIAL.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-06T03:42:06.000000Z",
          "updated_at": "2022-11-06T03:42:06.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2529,
          "name": "fadsl;jsafk",
          "description": "<p>asdfjalfk</p>",
          "image": "http://ongapi.alkemy.org/storage/UhOluyUo9m.png",
          "parent_category_id": null,
          "created_at": "2022-11-06T22:55:22.000000Z",
          "updated_at": "2022-11-06T22:55:22.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2533,
          "name": "Zoomorfo",
          "description": "<p>Aquellos que tienen forma de animal. Esto esta editado</p>",
          "image": "http://ongapi.alkemy.org/storage/MyZEhd6dUD.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-08T21:02:14.000000Z",
          "updated_at": "2022-11-08T21:04:39.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2538,
          "name": "dasdasdasdas",
          "description": "<p>dsdassdaads</p>",
          "image": "http://ongapi.alkemy.org/storage/XTY6FZYKlb.png",
          "parent_category_id": null,
          "created_at": "2022-11-12T08:25:40.000000Z",
          "updated_at": "2022-11-12T08:25:40.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2539,
          "name": "dsadsadasasd",
          "description": "<p>dsadasdada</p>",
          "image": "http://ongapi.alkemy.org/storage/Mdrz6Sv09V.png",
          "parent_category_id": null,
          "created_at": "2022-11-12T22:52:20.000000Z",
          "updated_at": "2022-11-12T22:52:20.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2540,
          "name": "curso de photoshop 3",
          "description": "<p>este cruso tiene una duracion de 10 meses</p>",
          "image": "http://ongapi.alkemy.org/storage/5Bo6pReTnI.png",
          "parent_category_id": null,
          "created_at": "2022-11-15T00:18:42.000000Z",
          "updated_at": "2022-11-15T00:20:51.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2541,
          "name": "Brunch en BA",
          "description": "<p>Los mejores brunch de <i><strong>BA y mas</strong></i></p>",
          "image": "http://ongapi.alkemy.org/storage/Ai8hrJTzUk.png",
          "parent_category_id": null,
          "created_at": "2022-11-16T22:14:38.000000Z",
          "updated_at": "2022-11-16T22:19:14.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2542,
          "name": "Biologia 33",
          "description": "<p>es un curso de biologia</p>",
          "image": "http://ongapi.alkemy.org/storage/vT2a6Gck1X.png",
          "parent_category_id": null,
          "created_at": "2022-11-17T15:57:18.000000Z",
          "updated_at": "2022-11-17T16:46:27.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2543,
          "name": "cate cat",
          "description": "<p>descri cate</p>",
          "image": "http://ongapi.alkemy.org/storage/OI6kzFrx6O.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-17T23:42:38.000000Z",
          "updated_at": "2022-11-17T23:42:38.000000Z",
          "deleted_at": null,
          "group_id": null
      },
      {
          "id": 2545,
          "name": "cate cate 1",
          "description": "<p>descr cate cate</p>",
          "image": "http://ongapi.alkemy.org/storage/XXiZpHIorS.jpeg",
          "parent_category_id": null,
          "created_at": "2022-11-17T23:47:43.000000Z",
          "updated_at": "2022-11-17T23:47:43.000000Z",
          "deleted_at": null,
          "group_id": null
      }
  ]

    const deleteCategoryHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar la categoría ${id}`,
            text: "Por favor, confirma",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrarla',
            cancelButtonText:"Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Categoría borrada!',
                    '',
                    'success'
                )
            }
        })
    }

    return (
        <BackofficeList
            deleteFunction={deleteCategoryHandler}
            title="Categorías"
            createButonLabel="categoría"
            tableData={mockedCategories}
            tableHeader={["name", "created_at"]}
            tableNames={["Nombre", "Fecha de creación"]}
        />
    )
}
