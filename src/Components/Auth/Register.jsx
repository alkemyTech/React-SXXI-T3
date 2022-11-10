import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "../FormStyles.css";
import "./Auth.css";
import img from "../../assets/images/login.jpg";
import RegisterForm from "./RegisterForm";
import logo from "../../assets/images/logo.png";

const Register = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDevice = () => {
      setIsMobile(window.innerWidth > 576 ? false : true);
    }
    updateDevice();
    window.addEventListener("resize", updateDevice);

    return () => {
      window.removeEventListener("resize", updateDevice);
    }
  }, []);

  return (
    <>
      <div className="row flex-sm-row flex-column-reverse">
          <div className="col-sm-6">
            <RegisterForm desktop={isMobile? false : true} />
          </div>
          <div className="col-sm-6 d-flex justify-content-center">
            <img src={isMobile ? logo : img} className="img-fluid" alt="imagen" />
          </div>
        </div>
    </>
  );
};

export default Register;
