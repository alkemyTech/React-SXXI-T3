import {ReactComponent as DonationSvg} from "./donation.svg";
import Button from "../Button/Button";

const DonationButton = ({ handleShow }) => {
  return (
    <Button
      label={
        <a
          href="https://mpago.la/1yVDu88"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DonationSvg className="donation-svg" />
          <span className="donation-text">Contribuye</span>
        </a>
      }
      onClick={handleShow}
      variant="primary"
      className="donation"
    />
  );
};

export default DonationButton;
