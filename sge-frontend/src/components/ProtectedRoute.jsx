//archivo necesario para q ningun intruso entre al dashboard sin haberse autenticado

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" replace /> //replace evita que pueda volver a las paginas privadas  con el boton de atras
    }

    return children; //devolver children equivale a devolver el mismo objeto, o sea un Layout
}

export default ProtectedRoute;