import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { cleanError, selectAuth } from "../../features/auth/authSlice";

// Components - Services
import LoginForm from "./LoginForm";
import { errorAlert } from "../Feedback/AlertService";

// Assets
import logo from "../../assets/images/logo.png";
import img from "../../assets/images/login.jpg";

// Styles
// import "bootstrap/dist/css/bootstrap.min.css";
import "../FormStyles.css";
import "./Auth.css";

const Login = () => {
    const dispatch = useDispatch();
    const { token, error, status } = useSelector(selectAuth);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateDevice = () => {
            setIsMobile(window.innerWidth > 576 ? false : true);
        };
        updateDevice();
        window.addEventListener("resize", updateDevice);

        return () => {
            window.removeEventListener("resize", updateDevice);
        };
    }, []);

    useEffect(() => {
        if (status === 'succeeded' && error) {
            errorAlert('email o contraseña invalidos');
            dispatch(cleanError());
        }
        if (status === 'failed') {
            errorAlert('Hay problemas con la red, revisa tu conexion a internet')
            dispatch(cleanError());
        }
    }, [status, error, dispatch])

    return (
        <>
            <div className="row flex-sm-row flex-column-reverse">
                <div className="col-sm-6">
                    {
                        token
                            ? <Navigate to={'/'} replace />
                            : <LoginForm desktop={isMobile ? false : true} />
                    }
                </div>
                <div className="col-sm-6 d-flex justify-content-center">
                    <img src={isMobile ? logo : img} className="img-fluid" alt="imagen" />
                </div>
            </div>
        </>
    );
};

export default Login;
