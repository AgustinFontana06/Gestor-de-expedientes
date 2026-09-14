import Input from "../components/Input";
import Button from "../components/Button";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authService";

function Register(){

    const navigate = useNavigate();

    //se crean los estados para almacenar los valores con value y onChange
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(){
            try{
                const respuesta = await register(nombre, email, password);
                if(respuesta){
                    navigate("/login");
                }
            }
            catch(error){
                alert(error.message);
            }
        }

    return(

        <div className = "register-container">
            <div className="register-card">
                <h1>SIGN UP</h1>
                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} type = "name" placeholder = "name"></Input>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type = "email" placeholder = "email"></Input>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type = "password" placeholder = "password"></Input>
                <Button texto = "Sign up" onClick={handleRegister}></Button>
            </div>
        </div>
    );
}

export default Register;