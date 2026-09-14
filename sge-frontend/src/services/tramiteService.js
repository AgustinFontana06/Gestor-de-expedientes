import { apiFetch } from "./api";

export async function obtenerTramites(expedienteId) {

    const response = await apiFetch(
        `/tramites/obtener-por-expediente/${expedienteId}`,
        {
            method: "GET"
        },
        true
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

export async function obtenerTramite(id){
    const response = await apiFetch(
        `/tramites/obtener-por/${id}`,
        {
            method: "GET"
        },
        true
    );

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.detail);
    }

    return data;
}

export async function eliminarTramite(id){
    const response = await apiFetch(
        `/tramites/eliminar-tramite/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                idTramite: id
            }),
        },
        true
    );

    //la declaracion de la respuesta esta adentro del if pq un delete puede devolver una respuesta vacia
    //a pesar de no haber tenido errores
    if(!response.ok){
        const data = await response.json();

        throw new Error(data.detail);
    }
}

export async function agregarTramite(expedienteId, text){
    const response = await apiFetch(
        `/tramites/agregar-tramite/${expedienteId}`,
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                contenidoText: text
            }),
        },
        true
    );

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.detail);
    }
}

export async function modificarTramite(id, texto){
    const response = await apiFetch(
        `/tramites/modificar-tramite/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                texto: texto
            }),
        },
        true
    );

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.detail);
    }

    return data;
}