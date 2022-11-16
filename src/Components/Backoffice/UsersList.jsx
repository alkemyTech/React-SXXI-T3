import React from 'react';
import BackofficeList from "./BackofficeList/BackofficeList";
import Swal from 'sweetalert2';


export const UsersList = () => {
    const usersMock = [  
      {
        "id": 1635,
        "name": "Lautaro",
        "email": "lauta@gmail.com",
        "email_verified_at": null,
        "password": "password",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-13T21:07:28.000000Z",
        "updated_at": "2022-11-07T16:42:19.000000Z",
        "deleted_at": null,
        "group_id": 4,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1646,
        "name": "sdsafasda",
        "email": "dasdas@gmail.com",
        "email_verified_at": null,
        "password": "1234",
        "role_id": 2,
        "remember_token": null,
        "created_at": "2022-02-14T01:20:12.000000Z",
        "updated_at": "2022-02-14T01:20:12.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1671,
        "name": "bren",
        "email": "bren@bren.com",
        "email_verified_at": null,
        "password": "$2y$10$nfWmZbA1izgEteCC.LTVr.K0UdgxDQkXwQzZd2S.9ZdXDvORyuL1e",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T18:13:25.000000Z",
        "updated_at": "2022-02-14T18:13:25.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1677,
        "name": "nuevo",
        "email": "email@dk.com",
        "email_verified_at": null,
        "password": "Boca1988",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T18:45:09.000000Z",
        "updated_at": "2022-11-10T18:02:38.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": "25 de mayo 474",
        "profile_image": null
      },
      {
        "id": 1679,
        "name": "iejeia",
        "email": "nestordelrio1989@gmaila.com.retry",
        "email_verified_at": null,
        "password": "$2y$10$dg1FuGJXBSaBLDaSIMypuuR2ZjT12sEQYbFFEhU3DvsDfu6E5vLiia",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T19:17:38.000000Z",
        "updated_at": "2022-08-21T22:48:54.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1680,
        "name": "jejeje",
        "email": "nestordelrio1989@gmail.com.retry.hh",
        "email_verified_at": null,
        "password": "$2y$10$1z2C7DGR08EsZis7nIJNI.9zyJkVCC4jOF42lQfmRGDb54xEZZHxK",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T19:21:44.000000Z",
        "updated_at": "2022-02-14T19:21:44.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1681,
        "name": "ailen",
        "email": "ai@len.com",
        "email_verified_at": null,
        "password": "$2y$10$VAzQ5PpE6/kbihuujdHcR.ug4jyGAYH7KDniTeGzoFEMu8HbgVnDa",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T19:22:54.000000Z",
        "updated_at": "2022-02-14T19:22:54.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1682,
        "name": "bren",
        "email": "breb@as.com",
        "email_verified_at": null,
        "password": "$2y$10$B1rXp7QiL8hLtRYaG0k.d.gKuCUCCxiY96GbdvxpysyCqBqF2FpLS",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T19:43:22.000000Z",
        "updated_at": "2022-02-14T19:43:22.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1685,
        "name": "jwjeje",
        "email": "nestordelrio1989@gmail.com.roberto",
        "email_verified_at": null,
        "password": "$2y$10$RDi19kP9JmlFeuKIXVG3M.p3ZNXDGMJf5TNJaWDryTPLzQT05uEX2",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T19:50:03.000000Z",
        "updated_at": "2022-02-14T19:50:03.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
      },
      {
        "id": 1686,
        "name": "nsbsh",
        "email": "nestordelrio1989@gmail.com.sagi",
        "email_verified_at": null,
        "password": "$2y$10$hIiNBN/oWtv55CRoJ0kdV.c.ClpczbzJvm.rXRSQWQKkhHH4Jn9Dq",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-02-14T19:55:47.000000Z",
        "updated_at": "2022-02-14T19:55:47.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
    }];

    const deleteNewHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar al usuario ${id}`,
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
                'Usuario borrado!',
                '',
                'success'
              )
            }
          })
    }
    
  return (
    <BackofficeList
    deleteFunction={deleteNewHandler}
    title="Usuarios"
    createButonLabel="usuario"
    tableData={usersMock}
    tableHeader={["name","email"]}
    tableNames={["Nombre", "Email"]}
/>
  )
}
