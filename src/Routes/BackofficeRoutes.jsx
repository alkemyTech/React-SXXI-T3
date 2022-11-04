import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import UsersForm from "../Components/Users/UsersForm";
import CategoriesForm from "../Components/Categories/CategoriesForm";
import MembersForm from "../Components/Members/MembersForm";
import ActivitiesForm from "../Components/Activities/ActivitiesForm";
import NewsForm from "../Components/News/NewsForm";
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
                <Route path="crear" element={<MembersForm />}/>
                <Route path="editar/:id" element={<MembersForm />}/>
            </Route>
            <Route path="categorias">
                <Route path="crear" element={<CategoriesForm />}/>
                <Route path="editar/:id" element={<CategoriesForm />}/>
            </Route>
            <Route path="novedades">
                <Route path="crear" element={<></>}/>
                <Route path="editar/:id" element={<></>}/>
            </Route>
            <Route path="actividades">
                <Route path="crear" element={<ActivitiesForm/>}/>
                <Route path="editar/:id" element={<ActivitiesForm/>}/>
            </Route>
            <Route path="*" element={<Navigate to=""/>}/>
        </Routes>
    );
}
export default BackofficeRoutes;