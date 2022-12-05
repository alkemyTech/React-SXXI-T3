import {ReactComponent as BackSvg} from "../../assets/svg/backoffice/back-arrow.svg";
import {Link} from "react-router-dom";

export const BackButton = () => {
  return (
    <Link to={".."}>
      <BackSvg className="back-svg" />
    </Link>
  );
};
