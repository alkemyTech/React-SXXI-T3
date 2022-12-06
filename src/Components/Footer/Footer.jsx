import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { NewsletterForm } from "./NewsletterForm/NewsletterForm";
import { SocialMediaItem } from "../Contact/SocialMediaItem";
// import { getOrganizationInfo } from "../../Services/organizationService/organizationService";
import { ReactComponent as FacebookSvg } from "../../assets/svg/contact/facebook.svg";
import { ReactComponent as InstagramSvg } from "../../assets/svg/contact/instagram.svg";
import { ReactComponent as TwitterSvg } from "../../assets/svg/contact/twitter.svg";
import { ReactComponent as LinkedinSvg } from "../../assets/svg/contact/linkedin.svg";

import "./Footer.css";
import { apiOrganization } from "../../Services/apiService";

export const Footer = () => {
  const [footerInfo, setFooterInfo] = useState({
    name: "",
    logo: "",
    facebook_url: "",
    linkedin_url: "",
    instagram_url: "",
    twitter_url: "",
  });

  useEffect(() => {
    apiOrganization.getAll()
        .then((info) => {
          setFooterInfo({
            name: info.name,
            logo: info.logo,
            facebook_url: info.facebook_url,
            linkedin_url: info.linkedin_url,
            instagram_url: info.instagram_url,
            twitter_url: info.twitter_url,
          });
        })
        .catch();
  }, []);

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-info-container" id="links">
          <Link to={"/"}>
            <div className="footer-text">{footerInfo.name}</div>
            <img
              src={footerInfo.logo}
              alt={footerInfo.name}
              className="footer-img"
            />
          </Link>
        </div>
        <hr />
        <div className="footer-links-container">
          <h3 className="footer-links-title">Enlaces útiles</h3>
          <div className="footer-links-subcontainer" id="links">
            <Link to="/">Inicio</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/actividades">Actividades</Link>
            <Link to="/novedades">Novedades</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/donar">Contribuye</Link>
          </div>
        </div>
        <hr />
        <div className="footer-socials-container">
          <h3 className="footer-socials-title">Redes sociales</h3>
          <div className="footer-socials-subcontainer">
            <SocialMediaItem
                className="contact-text"
                url={footerInfo.facebook_url}
                icon={<FacebookSvg />}
            />
            <SocialMediaItem
                className="contact-text"
                url={footerInfo.instagram_url}
                icon={<InstagramSvg />}
            />
            <SocialMediaItem
                className="contact-text"
                url={footerInfo.twitter_url}
                icon={<TwitterSvg />}
            />
            <SocialMediaItem
                className="contact-text"
                url={footerInfo.linkedin_url}
                icon={<LinkedinSvg />}
            />
          </div>
          <NewsletterForm />
        </div>
      </div>
    </footer>
  );
};
