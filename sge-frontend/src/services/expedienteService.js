import { apiFetch } from "./api";

export async function obtenerExpedientes() {

    const response = await apiFetch(
        "/expedientes/obtener-todos",
        {
            method: "GET"
        }
    );

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.detail);
    }

    return data;
}

export async function obtenerExpedientePorId(id) {

    const response = await apiFetch(
        `/expedientes/obtener-por-id/${id}`,
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

//creo el comunicador de mi front con el endpoint para agregar un expediente
export async function agregarExpediente(caratula){
    const response = await apiFetch(
        `/expedientes/agregar-expediente`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                caratulaText: caratula
            })
        },
        true
    );
    
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.detail);
    }

    return data;
}

export async function eliminarExpediente(id){
    const response = await apiFetch(
        `/expedientes/eliminar-expediente/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                idExpediente: id
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

export async function modificarCaratula(id, texto){
    const response = await apiFetch(
        `/expedientes/modificar-caratula/${id}`,
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

export async function cambiarEstado(id, estado){
    const response = await apiFetch(
        `/expedientes/cambiar-estado/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                estado: estado
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