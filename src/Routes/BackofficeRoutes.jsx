import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import UsersForm from "../Components/Users/UsersForm";

const BackofficeRoutes = () => {
    return (
        <Routes>
            <Route index element={<></>}/>
            <Route path="organizacion">
                <Route path="editar" element={<></>}/>
            </Route>
            <Route path="slides">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="proyectos">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="testimonios">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="usuarios">
                <Route path="crear" element={<UsersForm/>}/>
                <Route path="editar/:id" element={<UsersForm/>}/>
            </Route>
            <Route path="miembros">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="categorias">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="novedades">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="actividades">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="*" element={<Navigate to=""/>}/>
        </Routes>
    );
}
export default BackofficeRoutes;