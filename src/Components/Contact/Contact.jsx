import {useEffect, useState} from "react";

import Title from "../Title/Title";
import ContactForm from "./ContactForm/ContactForm";
import {getOrganizationInfo} from "../../Services/organizationService/organizationService";
import { SocialMediaItemWLabel } from "./SocialMediaItem";
import { ReactComponent as FacebookSvg } from "../../assets/svg/contact/facebook.svg";
import { ReactComponent as InstagramSvg } from "../../assets/svg/contact/instagram.svg";
import { ReactComponent as TwitterSvg } from "../../assets/svg/contact/twitter.svg";
import { ReactComponent as LinkedinSvg } from "../../assets/svg/contact/linkedin.svg";
import { ReactComponent as PhoneSvg } from "../../assets/svg/contact/phone-solid.svg";
import { ReactComponent as LocationSvg } from "../../assets/svg/contact/location-dot-solid.svg";

import "./Contact.css";

const Contact = () => {
  const [contactData, setContactData] = useState({
    address: "",
    phone: "",
    facebook_url: "",
    linkedin_url: "",
    instagram_url: "",
    twitter_url: "",
  });

  useEffect(() => {
    getOrganizationInfo()
      .then((info) => {
        setContactData({
          address: info.address,
          phone: info.phone,
          facebook_url: info.facebook_url,
          linkedin_url: info.linkedin_url,
          instagram_url: info.instagram_url,
          twitter_url: info.twitter_url,
        });
      })
      .catch();
  }, []);

  return (
    <div className="contact-container">
      <Title title="Contacto" />
      <ContactForm>
        {contactData && (
          <div className="contactdata-container">
            <h4>Como encontrarnos</h4>
            <div className="contactdata-subcontainer" id="links">
              <SocialMediaItemWLabel
                  className="contact-text"
                  url={contactData.facebook_url}
                  icon={<FacebookSvg />}
              />
              <SocialMediaItemWLabel
                  className="contact-text"
                  url={contactData.instagram_url}
                  icon={<InstagramSvg />}
              />
            </div>
            <div className="contactdata-subcontainer" id="links">
              <SocialMediaItemWLabel
                  className="contact-text"
                  url={contactData.twitter_url}
                  icon={<TwitterSvg />}
              />
              <SocialMediaItemWLabel
                  className="contact-text"
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
