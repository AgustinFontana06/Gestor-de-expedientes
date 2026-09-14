//encargado de comunicarse con la api
import { apiFetch } from "./api";
import { jwtDecode } from "jwt-decode";

export  function obtenerAdmin(){
    const token = localStorage.getItem("token");

    if(!token){
        return false;
    }   

    const claims = jwtDecode(token);
    
    return claims.esAdministrador === "True";
}

//este archivo sabe las operaciones que se pueden realizar con la api, como loguearse
export async function login(email, password){

    //se conecta con la api enviando los datos en json, como es el login le envio el endpoint "/login", la configuracion (request y
    // demas) y como no necesita autorizacion no hace falta poner true
    const response = await apiFetch(
        "/api/login",
        {
            method: "POST",
            body: JSON.stringify({ //convert js code into json
                email,
                password
            })
        }
    );

    //guardamos la respuesta y la enviamos
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.detail);
    }

    return data;
}

export async function register(nombre, email, password){
    if(!password){
        alert("la password es obligatoria");
        return
    }
    const response = await apiFetch(
        "/api/register",
        {
            method: "POST",
            body: JSON.stringify({
                nombre,
                email,
                password
            })
        }
    );

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.detail);
    }

    return data;
}