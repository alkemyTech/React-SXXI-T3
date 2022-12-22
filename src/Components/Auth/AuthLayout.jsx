import { cloneElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMinWindowSize } from "../../hooks/useMinWindowSize";
import img from "../../assets/images/login.jpg";
import logo from "../../assets/images/logo.png";
import { cleanError, selectAuth } from "../../features/auth/authSlice";
import { errorAlert } from "../Feedback/AlertService";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "../FormStyles.css";
import "./Auth.css";


export const AuthLayout = ({ children }) => {
    const navigate = useNavigate()
    const isMobile = useMinWindowSize(768);
    const dispatch = useDispatch();
    const { token, error, status } = useSelector(selectAuth);

    useEffect(() => {
        if (status === 'succeeded' && error) {
            errorAlert('email o contraseña invalidos');
            dispatch(cleanError());
        }
        if (status === 'failed') {
            if (error) {
                errorAlert('El correo ya esta registrado', "Por favor, ingresa otro correo o inicia sesión");
            }else{
                errorAlert('Hay problemas con la red, revisa tu conexion a internet')
            }
            dispatch(cleanError());
        }
    }, [status, error, dispatch])

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

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