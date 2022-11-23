import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import UsersForm from "../Components/Users/UsersForm/UsersForm";
import HomeForm from "../Components/Home/HomeForm/HomeForm";
import { Dashboard } from "../Components/Dashboard/Dashboard";
import { NewsList } from "../Components/Backoffice/NewsList";
import OrganizationScreen from "../Components/Organization/OrganizationScreen";
import OrganizationForm from "../Components/Organization/OrganizationForm";
import SlidesForm from "../Components/Slides/SlidesForm/SlidesForm";
import ProjectsForm from "../Components/Projects/ProjectsForm/ProjectsForm";
import TestimonialsForm from "../Components/Testimonials/TestimonialsForm/TestimonialsForm";
import MembersForm from "../Components/Members/MembersForm/MembersForm";
import CategoriesForm from "../Components/Categories/CategoriesForm/CategoriesForm";
import NewsForm from "../Components/News/NewsForm/NewsForm";
import ActivitiesForm from "../Components/Activities/ActivitiesForm/ActivitiesForm";
import HeaderBackoffice from "../Components/HeaderBackoffice";
import {SlidesList} from "../Components/Backoffice/SlidesList";
import {TestimonialsList} from "../Components/Backoffice/TestimonialsList";
import {UsersList} from "../Components/Backoffice/UsersList";
import MembersList from "../Components/About/MembersList";
import {CategoriesList} from "../Components/Backoffice/CategoriesList";
import ActivitiesList from "../Components/Activities/ActivitiesList";


const BackofficeRoutes = () => {
    return (
        <>
          <HeaderBackoffice />
            <Routes>
               <Route index element={<Dashboard/>}/>
                <Route path="home" element={<HomeForm/>}/>
                <Route path="organizacion">
                    <Route index element={<OrganizationScreen />} />
                    <Route path="editar" element={<OrganizationForm />}/>
                </Route>
                <Route path="slides">
                    <Route index element={<SlidesList/>}/>
                    <Route path="crear" element={<SlidesForm/>}/>
                    <Route path="editar/:id" element={<SlidesForm/>}/>
                </Route>
                <Route path="proyectos">
                    <Route path="crear" element={<ProjectsForm/>}/>
                    <Route path="editar/:id" element={<ProjectsForm/>}/>
                </Route>
                <Route path="testimonios">
                    <Route index element={<TestimonialsList />}/>
                <Route path="crear" element={<TestimonialsForm/>}/>
                    <Route path="editar/:id" element={<TestimonialsForm/>}/>
                </Route>
                <Route path="usuarios">
                    <Route index element={<UsersList/>}/>
                    <Route path="crear" element={<UsersForm/>}/>
                    <Route path="editar/:id" element={<UsersForm/>}/>
                </Route>
                <Route path="miembros">
                    <Route index element={<MembersList/>}/>
                    <Route path="crear" element={<MembersForm />}/>
                    <Route path="editar/:id" element={<MembersForm />}/>
                </Route>
                <Route path="categorias">
                    <Route index element={<CategoriesList/>}/>
                    <Route path="crear" element={<CategoriesForm />}/>
                    <Route path="editar/:id" element={<CategoriesForm />}/>
                </Route>
                <Route path="novedades">
                    <Route index element={<NewsList/>}/>
                    <Route path="crear" element={<NewsForm/>}/>
                    <Route path="editar/:id" element={<NewsForm/>}/>
                </Route>
                <Route path="actividades">
                    <Route index element={<ActivitiesList/>}/>
                    <Route path="crear" element={<ActivitiesForm/>}/>
                    <Route path="editar/:id" element={<ActivitiesForm/>}/>
                </Route>
                <Route path="*" element={<Navigate to=""/>}/>
            </Routes>
        </>

    );
}

export default BackofficeRoutes;
