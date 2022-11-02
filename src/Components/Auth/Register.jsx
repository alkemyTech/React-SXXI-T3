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
      {!isMobile ? (
        <div className="row">
          <div className="col-6 d-flex flex-column justify-content-center">
            <RegisterForm desktop={true} />
          </div>
          <div className="col-6">
            <img src={img} className="img-fluid" alt="imagen" />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm d-flex justify-content-center align-items-center">
            <div className="logo">
              <img src={logo} className="img-fluid" alt="logo" />
            </div>
          </div>
          <div className="col-sm d-flex justify-content-center align-items-center">
            <RegisterForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
