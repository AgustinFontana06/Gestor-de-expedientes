import { obtenerAdmin } from "../services/authService";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    if(obtenerAdmin()){
        return children;
    }
    return <Navigate to="/dashboard" replace/>
}

export default AdminRoute;