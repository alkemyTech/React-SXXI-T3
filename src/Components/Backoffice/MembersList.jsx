import React from 'react';
import BackofficeList from "./BackofficeList/BackofficeList";
import Swal from 'sweetalert2';


export const MembersList = () => {
    const mockedMembers =[
        {
            "id": 876,
            "name": "Cecilia Mendez",
            "image": "http://ongapi.alkemy.org/storage/f3fGtVSrtP.jpeg",
            "description": "<p>Psicopedagoga</p>",
            "facebookUrl": "https://www.facebook.com/zuck/",
            "linkedinUrl": "https://www.linkedin.com/in/mark-zuckerberg-618bba58/",
            "created_at": "2022-09-28T12:35:00.000000Z",
            "updated_at": "2022-09-28T12:35:00.000000Z",
            "deleted_at": null,
            "group_id": null
        },
        {
            "id": 877,
            "name": "Marco Fernandez",
            "image": "http://ongapi.alkemy.org/storage/dQqg226i0o.jpeg",
            "description": "<p>Profesor de Educación Física</p>",
            "facebookUrl": "https://www.facebook.com/zuck/",
            "linkedinUrl": "https://www.linkedin.com/in/mark-zuckerberg-618bba58/",
            "created_at": "2022-09-28T12:36:24.000000Z",
            "updated_at": "2022-09-28T12:36:24.000000Z",
            "deleted_at": null,
            "group_id": null
        },
        {
            "id": 878,
            "name": "María irola",
            "image": "http://ongapi.alkemy.org/storage/7bivLUIk81.jpeg",
            "description": "<p>Cofundadora de la ONG</p>",
            "facebookUrl": "https://www.facebook.com/zuck/",
            "linkedinUrl": "https://www.linkedin.com/in/mark-zuckerberg-618bba58/",
            "created_at": "2022-09-28T12:40:50.000000Z",
            "updated_at": "2022-09-28T12:40:50.000000Z",
            "deleted_at": null,
            "group_id": null
        },
        {
            "id": 879,
            "name": "Gabriel V",
            "image": "http://ongapi.alkemy.org/storage/xGK239X9xt.jpeg",
            "description": "<p>Soy FullStack Web devolper</p>",
            "facebookUrl": "https://www.facebook.com/zuck/",
            "linkedinUrl": "https://www.linkedin.com/in/mark-zuckerberg-618bba58/",
            "created_at": "2022-11-03T03:09:09.000000Z",
            "updated_at": "2022-11-03T22:01:35.000000Z",
            "deleted_at": null,
            "group_id": null
        },
        {
            "id": 880,
            "name": "Beatriz Stern",
            "image": "http://ongapi.alkemy.org/storage/BMAWVs0T93.jpeg",
            "description": "<p>Coordinadora Programa Mayores Activos</p>",
            "facebookUrl": "https://www.facebook.com/zuck/",
            "linkedinUrl": "https://www.linkedin.com/in/mark-zuckerberg-618bba58/",
            "created_at": "2022-11-03T03:19:57.000000Z",
            "updated_at": "2022-11-11T04:29:12.000000Z",
            "deleted_at": null,
            "group_id": null
        },
        {
            "id": 881,
            "name": "Ignacio Clarunt",
            "image": "http://ongapi.alkemy.org/storage/bfr4GQkc1X.jpeg",
            "description": "<p>Consultor de monitoreo y proyectos</p>",
            "facebookUrl": "https://www.facebook.com/zuck/",
            "linkedinUrl": "https://www.linkedin.com/in/mark-zuckerberg-618bba58/",
            "created_at": "2022-11-03T22:21:45.000000Z",
            "updated_at": "2022-11-11T04:34:15.000000Z",
            "deleted_at": null,
            "group_id": null
        },
        {
            "id": 882,
            "name": "Miembro Test",
            "image": "http://ongapi.alkemy.org/storage/zChotrntKh.jpeg",
            "description": "Miembro cualquiera",
            "facebookUrl": "facebook.com",
            "linkedinUrl": "linkedin.com",
            "created_at": "2022-11-07T21:16:40.000000Z",
            "updated_at": "2022-11-07T21:16:40.000000Z",
            "deleted_at": null,
            "group_id": null
        }
    ]

    const deleteMemberHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar al miembro ${id}`,
            text: "Por favor, confirma",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrarlo',
            cancelButtonText:"Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Miembro borrado!',
                    '',
                    'success'
                )
            }
        })
    }

    return (
        <BackofficeList
            deleteFunction={deleteMemberHandler}
            title="Miembros de la Organización"
            createButonLabel="miembro"
            tableData={mockedMembers}
            tableHeader={["name", "image"]}
            tableNames={["Nombre", "Foto"]}
        />
    )
}
