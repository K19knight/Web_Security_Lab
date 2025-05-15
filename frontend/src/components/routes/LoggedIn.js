import {useAuth} from "../../auth/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

const LoggedIn = () => {
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default LoggedIn;