import Button from "../../components/Button";
import Input from "../../components/Input"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { modificarDatos }from "../../services/usuarioService";

function MiPerfil(){

    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");


    async function handleModificarDatos(){
        try{
            await modificarDatos(name, email, password);
        } catch (error){
            alert(error.message);
        }
    }

    function handleLogOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        navigate("/login");
    }

    return(
        <>
            <div className="modificardatos">
                <Input value={name} onChange={(e) => setName(e.target.value)} type = "name" placeholder = "name"></Input>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type = "email" placeholder = "email"></Input>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type = "password" placeholder = "password"></Input>
                <Button texto="modificar datos" onClick={() => handleModificarDatos()}></Button>
            </div>
            <div className="log-out">
                <Button texto="log out" onClick={() => handleLogOut()}></Button>
            </div>
        </>
    );
}

export default MiPerfil;