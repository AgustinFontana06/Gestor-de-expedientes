//guardar url de la api
export const API_URL = "http://localhost:5049";

//configuracion de las peticiones, se envia el endpoint, las configuraciones y si requiere token o no
export async function apiFetch(endpoint, options = {}, requiereToken = false) {

    //el header es la configuracion del fetch que realiza cuando busca la peticion
    const headers = {
        "Content-Type": "application/json",
        //...options desempaqueta lo que esta dentro del objeto options para meterlo dentro de headers
        ...options.headers
    };

    //si requiere token lo busca del localStorage y lo agrega al authorization
    if (requiereToken) {
        const token = localStorage.getItem("token");

        headers.Authorization = `Bearer ${token}`;
    }

    //se crea el objeto fetch y lo envia al backend
    return fetch(`${API_URL}${endpoint}`, {
        //options se define como un objeto vacio si es q no se ingresa un parametro, para asi evitar errores a la hora de accederlo
        ...options,
        headers
    });
}