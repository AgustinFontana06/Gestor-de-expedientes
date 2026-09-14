import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { obtenerAdmin } from "../services/authService";

//el classname isActive me dice: si este navlink corresponde a la url en la que estoy agregale un css llamado "activo", sino nad

function Navbar(){

    const esAdmin = obtenerAdmin();

    return (
        <nav className="navbar">

            
            <NavLink to="/dashboard" className={({ isActive }) => {
                if (isActive) {
                    return "activo";
                } else {
                    return "";
                }
                }}>
                Dashboard
            </NavLink>

            <NavLink to="/expedientes" className={({ isActive }) => isActive ? "activo" : ""}>
                Expedientes
            </NavLink>

            {esAdmin && (
            <NavLink to="/usuarios" className={({ isActive }) => isActive ? "activo" : ""}>
                Usuarios
            </NavLink>)}

            <NavLink to="/perfil" className={({ isActive }) => isActive ? "activo" : ""}>
                Mi perfil
            </NavLink>

        </nav>
    );
}

export default Navbar;