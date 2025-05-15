import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const NotLoggedIn = () => {
    const { user } = useAuth();

    return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default NotLoggedIn;