import React from 'react';
import BackofficeList from "./BackofficeList/BackofficeList";
import Swal from 'sweetalert2';
import { apiTestimonials } from '../../Services/apiService';
import { errorAlert } from '../Feedback/AlertService';


export const TestimonialsList = () => {
    const mockedData = [
      {
        "id": 466,
        "name": "Gabriel",
        "image": "http://ongapi.alkemy.org/storage/c1QCIhLZVK.json",
        "description": "<p>Editado con CkEfffditor!</p>",
        "created_at": "2022-03-28T20:33:00.000000Z",
        "updated_at": "2022-11-13T18:55:40.000000Z",
        "deleted_at": null,
        "group_id": 42
    },
    {
        "id": 479,
        "name": "Barack Obama",
        "image": "http://ongapi.alkemy.org/storage/KxM7HhqznG.jpeg",
        "description": "<p>Somos Más es una organizacion benéfica que aporta mucho a la sociedad.&nbsp;</p>",
        "created_at": "2022-04-14T21:57:44.000000Z",
        "updated_at": "2022-11-21T21:55:00.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 484,
        "name": "Javier Figuera",
        "image": "http://ongapi.alkemy.org/storage/o8LIj3tdCQ.jpg",
        "description": "La sonrisa de los niños y los abrazos se convirtieron en la recompensa mas valiosa de mis días. Gracias Somos Más por permitirme formar parte de su ONG.",
        "created_at": "2022-04-16T19:44:34.000000Z",
        "updated_at": "2022-04-16T19:44:34.000000Z",
        "deleted_at": null,
        "group_id": 42
    },
    {
        "id": 485,
        "name": "Juan Mirabal",
        "image": "http://ongapi.alkemy.org/storage/72SoerwO1J.jpg",
        "description": "Me parece que no hay nada más gratificante que ver a los niños reir y felcices, disfrutando su inocencia. Esto es una de las tantas cosas que logra Somos Más con sus iniciativas",
        "created_at": "2022-04-16T19:46:06.000000Z",
        "updated_at": "2022-04-16T19:46:06.000000Z",
        "deleted_at": null,
        "group_id": 42
    },
    {
        "id": 486,
        "name": "Margareth Milano",
        "image": "http://ongapi.alkemy.org/storage/kWN0xco2KJ.jpg",
        "description": "Fue muy impactante ver la gran necesidad que sufren algunas familias, dentro de estas muchos niños y adolescentes, por suerte existen organizaciones como estas para brindar un rayo de sol",
        "created_at": "2022-04-16T19:46:48.000000Z",
        "updated_at": "2022-04-16T19:46:48.000000Z",
        "deleted_at": null,
        "group_id": 42
    },
    {
        "id": 487,
        "name": "Melisa Garzon",
        "image": "http://ongapi.alkemy.org/storage/FbGxI0SkqC.jpg",
        "description": "Me enamoré de las mascotas al tener que participar en el programa donde se hacian participar a los jóvenes en el cuidado de animales abandonados.",
        "created_at": "2022-04-16T19:47:24.000000Z",
        "updated_at": "2022-04-16T19:47:24.000000Z",
        "deleted_at": null,
        "group_id": 42
    },
    {
        "id": 488,
        "name": "Juan Yanes",
        "image": "http://ongapi.alkemy.org/storage/UyQjFe9NAp.jpg",
        "description": "En las jornadas de fútbol, muchos jóvenes se veían motivados y empezaban a ver el deporte como una posible carrera profesional, Somos Más abre la mente de los chichos.",
        "created_at": "2022-04-16T19:48:06.000000Z",
        "updated_at": "2022-04-16T19:48:06.000000Z",
        "deleted_at": null,
        "group_id": 42
    },
    {
        "id": 489,
        "name": "Frodo Baggins",
        "image": "http://ongapi.alkemy.org/storage/4NjKkUWumJ.jpeg",
        "description": "Ni tirar el anillo en el monte del destino me dio mas satisfacciones que aportar a Somos más. Sus campañas son excelentes.",
        "created_at": "2022-04-17T15:22:17.000000Z",
        "updated_at": "2022-05-19T01:00:54.000000Z",
        "deleted_at": null,
        "group_id": 49
    },
    {
        "id": 494,
        "name": "Indiana Jones",
        "image": "http://ongapi.alkemy.org/storage/hStWsVj32L.jpeg",
        "description": "Ver la sonrisa de esos niños es el tesoro más grande que cualquiera puede encontrar. Mas que agradecido de haber participado en las iniciativas que llevan a cabo.",
        "created_at": "2022-04-17T15:29:38.000000Z",
        "updated_at": "2022-05-19T13:02:50.000000Z",
        "deleted_at": null,
        "group_id": 49
    },
    {
        "id": 501,
        "name": "Pablo David",
        "image": "http://ongapi.alkemy.org/storage/2hRnXWO7X3.jpeg",
        "description": "Es emocionante poder ser parte del desarrollo de las infancias y adolescencias, que se lleven cosas valiosas y sobretodo anecdotas felices.",
        "created_at": "2022-05-16T03:21:47.000000Z",
        "updated_at": "2022-05-19T13:17:23.000000Z",
        "deleted_at": null,
        "group_id": 10
    },
    {
        "id": 505,
        "name": "Miguel Scott",
        "image": "http://ongapi.alkemy.org/storage/mciMx39yga.jpeg",
        "description": "La jornada del sábado 15 de febrero fue hermosa, y la volvería a repetir.",
        "created_at": "2022-05-17T14:18:37.000000Z",
        "updated_at": "2022-05-19T13:13:50.000000Z",
        "deleted_at": null,
        "group_id": 10
    },
    {
        "id": 506,
        "name": "Susana Lopez",
        "image": "http://ongapi.alkemy.org/storage/6ntJ2doxct.jpeg",
        "description": "Agradecida de formar parte de esta organización",
        "created_at": "2022-05-17T14:25:32.000000Z",
        "updated_at": "2022-05-19T13:12:43.000000Z",
        "deleted_at": null,
        "group_id": 10
    },
    {
        "id": 507,
        "name": "qqkkkssss",
        "image": "http://ongapi.alkemy.org/storage/LklLVvZEwV.jpeg",
        "description": "<p>Muy contenta por la opbjbjbbjortzzunidad!</p>",
        "created_at": "2022-05-17T15:10:19.000000Z",
        "updated_at": "2022-06-24T17:42:22.000000Z",
        "deleted_at": null,
        "group_id": 10
    },
    {
        "id": 509,
        "name": "Elon Musk",
        "image": "http://ongapi.alkemy.org/storage/wzo4QwWXWV.jpeg",
        "description": "Desde SpaceX nos enorgullecemos de participar en todas las iniciativas de Somos Más. Cada jornada es inolvidable",
        "created_at": "2022-05-19T01:06:44.000000Z",
        "updated_at": "2022-05-19T01:06:44.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 510,
        "name": "Charles Xavier",
        "image": "http://ongapi.alkemy.org/storage/exh2GZXjJC.jpeg",
        "description": "Desde el School for Gifted Youngsters celebramos toda el entusiasmo \ne impetu con el que esta ONG lleva adelante sus propuestas.",
        "created_at": "2022-05-19T01:26:48.000000Z",
        "updated_at": "2022-05-19T01:26:48.000000Z",
        "deleted_at": null,
        "group_id": null
    },
     ];

    const deleteTestimonialHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar el testimonio ${id}`,
            text: "Por favor, confirma",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrarlo',
            cancelButtonText:"Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
				apiTestimonials.remove(id)
				.then(response => {
					Swal.fire(
						'Testimonio borrado!',
						'',
						'success'
					)
				})
				.catch(error => errorAlert())
			}
          })
    }
    
  return (
    <BackofficeList
    deleteFunction={deleteTestimonialHandler}
    title="Testimonios"
    createButonLabel="testimonio"
    tableData={mockedData}
    tableHeader={["name", "image","created_at"]}
    tableNames={["Título", "Imagen", "Creado en"]}
/>
  )
}
