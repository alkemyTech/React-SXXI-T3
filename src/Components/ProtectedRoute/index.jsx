import { useSelector } from "react-redux"
import { selectAuth } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();
    const { token, user } = useSelector(selectAuth);
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {

        if (token && user.role_id === 1) {
            setAuthenticated(() => true);
        } else {
            navigate('/', { replace: true })
        }

    }, [token, user, navigate])

    return (<>{authenticated ? children : null}</>);
}

export default ProtectedRoute;