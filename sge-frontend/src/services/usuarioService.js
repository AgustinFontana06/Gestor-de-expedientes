import { apiFetch } from "./api";

export async function obtenerUsuarios(){
    const response = await apiFetch(
        "/usuarios/admin/listar",
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

export async function modificarDatos(name, email, password){
    const response = await apiFetch(
        "/usuarios/me",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre : name,
                email : email,
                contraseña : password
            })
        },
        true
    )

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.detail)
    }

    return data;
}

export async function eliminarUsuario(id){
    const response = await apiFetch(
        `/usuarios/admin/eliminar/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: id
            }),
        },
        true
    )
}

export async function agregarPermisos(id, permisos){
    const response = await apiFetch(`/usuarios/admin/agregar-permisos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            permisos : permisos
        }),
    },
    true
    );

    if(!response.ok){
        throw new Error("Error al agregar permisos");
    }

    return await response.json();
}

export async function eliminarPermisos(id, permisos) {
    const response = await apiFetch(`/usuarios/admin/eliminar-permisos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            permisos : permisos
        }),
    },
    true
    );

    if (!response.ok) {
        throw new Error("Error al eliminar permisos");
    }

    return await response.json();
}
