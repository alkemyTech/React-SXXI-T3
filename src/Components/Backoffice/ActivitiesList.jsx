import React from 'react';
import BackofficeList from "./BackofficeList/BackofficeList";
import Swal from 'sweetalert2';


export const ActivitiesList = () => {
    const mockedData = [
      {
        "id": 2074,
        "name": "Volar Barriletes",
        "slug": null,
        "description": "<p>La mayor&iacute;a de los ni&ntilde;os despu&eacute;s de una faena de juegos caen rendidos en sus camas; y pasar un d&iacute;a volando cometas bien puede ser una actividad placentera para tu hijo y para toda la familia.</p>",
        "image": "http://ongapi.alkemy.org/storage/BKxNd6AHEY.jpeg",
        "user_id": 0,
        "category_id": 0,
        "created_at": "2022-09-20T01:06:05.000000Z",
        "updated_at": "2022-10-21T20:18:48.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 2156,
        "name": "Asistencia familiar",
        "slug": null,
        "description": "<p>El Servicio de Asistencia Familiar es un&nbsp;dispositivo de<strong> atenci&oacute;n de ni&ntilde;os, ni&ntilde;as y adolescente</strong>s que est&aacute;n atravesando un conflicto por vulneraci&oacute;n de derechos.</p>",
        "image": "http://ongapi.alkemy.org/storage/Ws1sO2BtEP.jpeg",
        "user_id": null,
        "category_id": null,
        "created_at": "2022-09-26T21:50:18.000000Z",
        "updated_at": "2022-10-21T20:21:25.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 2162,
        "name": "Actividades al aire libre",
        "slug": null,
        "description": "<p>Con el juego&nbsp;<strong>no estructurado</strong>&nbsp;es como los ni&ntilde;os descubren qu&eacute; les gusta hacer, experimentan sensaciones hermosas como la libertad, la alegr&iacute;a y hasta el &eacute;xtasis de sentirse exhausto por tanta diversi&oacute;n.&nbsp;</p>",
        "image": "http://ongapi.alkemy.org/storage/uDtfo7hXbw.jpeg",
        "user_id": null,
        "category_id": null,
        "created_at": "2022-09-26T23:25:52.000000Z",
        "updated_at": "2022-10-21T20:19:21.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 2163,
        "name": "Lectura con niños",
        "slug": null,
        "description": "<p>A partir de los seis a&ntilde;os, los ni&ntilde;os comienzan a adquirir capacidades de comprensi&oacute;n en lo que a la lectura de textos se refiere.&nbsp;<strong>Es importante ayudarles en su desarrollo</strong>&nbsp;de estas habilidades, siempre instruy&eacute;ndoles y facilit&aacute;ndoles documentos de un nivel adecuado para su edad.</p>",
        "image": "http://ongapi.alkemy.org/storage/UtPVrtu5qG.jpeg",
        "user_id": null,
        "category_id": null,
        "created_at": "2022-09-27T00:00:45.000000Z",
        "updated_at": "2022-10-21T20:25:50.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 2164,
        "name": "Talleres de Arte",
        "slug": null,
        "description": "<p>Valijas de&nbsp;<em>arte</em>&nbsp;llenas de materiales&nbsp;<em>para</em>&nbsp;que los&nbsp;<em>ni&ntilde;os</em>&nbsp;puedan crear lo que ellos quieran. Solo tienen que dejar volar su imaginaci&oacute;n!</p>",
        "image": "http://ongapi.alkemy.org/storage/jJK5SXghDG.jpeg",
        "user_id": 0,
        "category_id": 0,
        "created_at": "2022-09-27T21:14:32.000000Z",
        "updated_at": "2022-10-21T20:22:31.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 2169,
        "name": "Eventos para niños",
        "slug": null,
        "description": "<p>Hay desde funciones de teatro y t&iacute;teres, feria del libro, hasta paseos y talleres gratuitos.&nbsp;</p>",
        "image": "http://ongapi.alkemy.org/storage/JElMVmj7lC.jpeg",
        "user_id": 0,
        "category_id": 0,
        "created_at": "2022-10-14T22:36:30.000000Z",
        "updated_at": "2022-10-21T20:25:08.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 2221,
        "name": "curso de futbol",
        "slug": null,
        "description": "<p>lecciones de futbol para ni&ntilde;os</p>",
        "image": "http://ongapi.alkemy.org/storage/8zyPYJFFIj.jpeg",
        "user_id": 0,
        "category_id": 0,
        "created_at": "2022-10-24T21:41:09.000000Z",
        "updated_at": "2022-10-24T21:41:09.000000Z",
        "deleted_at": null,
        "group_id": null
    }
     ];

    const deleteActivityHandler = (id) => {
        Swal.fire({
            title: `Se procederá a borrar la actividad ${id}`,
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
                'Actividad borrada!',
                '',
                'success'
              )
            }
          })
    }
    
  return (
    <BackofficeList
    deleteFunction={deleteActivityHandler}
    title="Actividades"
    createButonLabel="actividad"
    tableData={mockedData}
    tableHeader={["name", "image","created_at"]}
    tableNames={["Título", "Imagen", "Creado en"]}
/>
  )
}
