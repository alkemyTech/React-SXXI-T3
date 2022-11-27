import s from "./memberCard.module.css";

import altImage from "../assets/avatar_member_3.png";
import {ReactComponent as FacebookSvg} from "../../../assets/svg/contact/facebook.svg";
import {ReactComponent as LinkedinSvg} from "../../../assets/svg/contact/linkedin.svg";

import { createMarkUp } from "../../../utils/createMarkUp";
import {SocialMediaItem} from "../../Contact/SocialMediaItem";

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
            <SocialMediaItem url={linkedinUrl}  icon={<LinkedinSvg />} className={s.logo}/>
            <SocialMediaItem url={facebookUrl}  icon={<FacebookSvg />} className={s.logo}/>
      </div>
    </div>
  );

  return element;
};

export default Card;
