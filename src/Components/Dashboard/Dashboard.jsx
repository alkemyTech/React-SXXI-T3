import React from "react";
import { FeatureCard } from "./FeatureCard";
import news from "../../assets/images/backoffice-logos/news.jpg";
import activities from "../../assets/images/backoffice-logos/activities.jpg";
import categories from "../../assets/images/backoffice-logos/categories.jpg";
import testimonials from "../../assets/images/backoffice-logos/testimonials.jpg";
import organization from "../../assets/images/backoffice-logos/organization.jpg";
import slides from "../../assets/images/backoffice-logos/slides.jpg";
import users from "../../assets/images/backoffice-logos/users.jpg";
import members from "../../assets/images/backoffice-logos/members.jpg";

export const Dashboard = () => {
  const features = [
    {
      id: 0,
      name: "Novedades",
      logo: news,
      link: "/backoffice/novedades",
    },
    {
      id: 1,
      name: "Actividades",
      logo: activities,
      link: "",
    },
    {
      id: 2,
      name: "Categorías",
      logo: categories,
      link: "",
    },
    {
      id: 3,
      name: "Testimonios",
      logo: testimonials,
      link: "",
    },
    {
      id: 4,
      name: "Organización",
      logo: organization,
      link: "",
    },
    {
      id: 5,
      name: "Slides",
      logo: slides,
      link: "",
    },
    {
      id: 6,
      name: "Usuarios",
      logo: users,
      link: "",
    },
    {
      id: 7,
      name: "Miembros",
      logo: members,
      link: "",
    },
  ];
  return (
    <div>
      <div className="row" style={{ height: "150px", alignItems: "center" }}>
        <div className="col text-center">
          <h1 className="">Bienvenido al Dashboard de Administrador</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        {features.map((element) => {
          return (
            <div className="col-10 col-md-4 col-lg-3" key={element.id}>
              <FeatureCard
                name={element.name}
                logo={element.logo}
                link={element.link}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
