import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const IsAdmin = () => {
    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default IsAdmin;