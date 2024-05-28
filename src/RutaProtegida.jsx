import { useAuth } from "./controller/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function RutaProtegida() {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <h1>Cargando...</h1>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default RutaProtegida;
