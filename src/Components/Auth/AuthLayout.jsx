import {cloneElement} from "react";

import {useMobile} from "../../hooks/useIsMobile";
import img from "../../assets/images/login.jpg";
import logo from "../../assets/images/logo.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "../FormStyles.css";
import "./Auth.css";


export const AuthLayout = ({ children }) => {
    const isMobile = useMobile();
    return (
        <>
        <div className="row g-0 flex-md-row flex-column-reverse flex-nowrap auth-cont">
            <div className="col-12 col-sm-10 col-md-6 col-lg-7 auth-form-cont">
                {cloneElement(children, {desktop: !isMobile})}
            </div>
            <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center ">
                <img src={isMobile ? logo : img} className="img-fluid auth-image" alt="imagen" />
            </div>
        </div>
        </>
    );
}