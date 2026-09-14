import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Home.css";

function Home(){
    const navigate = useNavigate();
    return(
        <>
            <h2> Gestor de Expedientes </h2>
            <div className="botones">
            <Button
                texto="Iniciar sesión"
                onClick={() => navigate("/login")}
            />

            <Button
                texto="Registrarse"
                onClick={() => navigate("/register")}
            />
            </div>
        </>
    );
}

export default Home;