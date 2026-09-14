//importar componentes para crear la pagina
import Input from "../components/Input";
import Button from "../components/Button";
import "./Login.css";
//importar componentes para su funcionalidad
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login(){

    const navigate = useNavigate();

    //se crean los estados para almacenar los valores con value y onChange
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    //uso de fetch: funcion que se utiliza de js para hacer peticiones http
    //usamos la funcion async, ya que la peticion puede llegar en cualquier momento, la app funciona sin importar cuanto
    //tarden en llegar los datos

    //funcion que realiza una peticion y devuelve un objeto respuesta
    async function handleLogin(){
        try{
            const respuesta = await login(email, password);
            console.log(respuesta.token);
            localStorage.setItem("token", respuesta.token);

            const payload = JSON.parse(
                atob(respuesta.token.split(".")[1])
            );

            console.log(payload);
            localStorage.setItem("nombre", payload.nombre);

            navigate("/dashboard");
        }
        catch(error){
            alert(error.message);
        }
    }

    async function handleRegister(){
        navigate("/register");
    }


    return(
        <>
        <div className = "login-container">
            <div className="login-card">
                <h1>LOGIN</h1>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type = "email" placeholder = "email"></Input>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type = "password" placeholder = "password"></Input>
                <Button texto = "Login" onClick={handleLogin}></Button>
                <Button texto = "Forgot password"></Button>
            </div>
        </div>

        <div className = "register-container">
            <Button texto = "Register" onClick={handleRegister}></Button>
        </div>
        </>
    );
}

export default Login;