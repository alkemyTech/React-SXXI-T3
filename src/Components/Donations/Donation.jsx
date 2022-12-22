import { useEffect, useState } from "react";

import DonationButton from "./DonationButton";
import ThanksOverlay from "./ThanksOverlay";

import "./styles.css";

const Donation = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [show]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <DonationButton show={show} handleShow={handleShow} />
      <ThanksOverlay show={show} handleClose={handleClose} />
    </>
  );
};

export default Donation;
