import { useEffect, useState } from "react";

import Title from "../Title/Title";
import ContactForm from "./ContactForm/ContactForm";
import { ReactComponent as FacebookSvg } from "../../assets/svg/contact/facebook.svg";
import { ReactComponent as InstagramSvg } from "../../assets/svg/contact/instagram.svg";
import { ReactComponent as TwitterSvg } from "../../assets/svg/contact/twitter.svg";
import { ReactComponent as LinkedinSvg } from "../../assets/svg/contact/linkedin.svg";
import { ReactComponent as PhoneSvg } from "../../assets/svg/contact/phone-solid.svg";
import { ReactComponent as LocationSvg } from "../../assets/svg/contact/location-dot-solid.svg";
import { parseUsername } from "./parseUsernames";

import "./Contact.css";

const Contact = () => {
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    setContactData({
      address: "Paraguay 733, (C1057AAI) Ciudad Autónoma de Buenos Aires",
      phone: "1160112988",
      facebook_url: "https://web.facebook.com/Somos_mass",
      linkedin_url: "https://www.linkedin.com/SomosMass",
      instagram_url: "https://www.instagram.com/Somos_mas",
      twitter_url: "https://www.twitter.com/SomosMas",
    });
  }, []);

  return (
    <div className="contact-container">
      <Title title="Contacto" />
      <ContactForm>
        {contactData && (
          <div className="contactdata-container">
            <h4>Como encontrarnos</h4>

            <div className="contactdata-subcontainer">
              <SocialMediaItem
                url={contactData.facebook_url}
                icon={<FacebookSvg />}
              />
              <SocialMediaItem
                url={contactData.instagram_url}
                icon={<InstagramSvg />}
              />
            </div>
            <div className="contactdata-subcontainer">
              <SocialMediaItem
                url={contactData.twitter_url}
                icon={<TwitterSvg />}
              />
              <SocialMediaItem
                url={contactData.linkedin_url}
                icon={<LinkedinSvg />}
              />
            </div>
            <div className="contact-text">
              <PhoneSvg /> {contactData.phone}
            </div>
            <div className="contact-text">
              <LocationSvg /> {contactData.address}
            </div>
          </div>
        )}
      </ContactForm>
    </div>
  );
};

export default Contact;

const SocialMediaItem = ({ url, icon }) => {
  return (
    <div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-text"
      >
        {icon} {parseUsername(url)}
      </a>
    </div>
  );
};
