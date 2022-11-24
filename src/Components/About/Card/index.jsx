import s from "./memberCard.module.css";

import altImage from "../assets/avatar_member_3.png";
import facebookIcon from "../assets/face_icon.png";
import linkedinIcon from "../assets/linkedin_icon.png";

import { createMarkUp } from "../../../utils/createMarkUp";

const Card = (props) => {
  const { name, image, description, linkedinUrl, facebookUrl } = props;

  const element = (
    <div className={s.card}>
      <div
        style={{ backgroundImage: `url(${image || altImage})` }}
        className={s.image_container}
      >
        <p>{name}</p>
      </div>
      <div className={s.description_container}>
        <div
          className={s.description_text}
          dangerouslySetInnerHTML={createMarkUp(description)}
        ></div>
      </div>
      <div className={s.media_container}>
        <div className={s.logo}>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            <img src={linkedinIcon} alt="linkedin" />
          </a>
        </div>
        <div className={s.logo}>
          <a href={facebookUrl} target="_blank" rel="noreferrer">
            <img src={facebookIcon} alt="facebook" />
          </a>
        </div>
      </div>
    </div>
  );

  return element;
};

export default Card;
