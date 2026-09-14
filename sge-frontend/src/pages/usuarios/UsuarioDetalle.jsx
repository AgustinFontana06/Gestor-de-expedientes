import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eliminarUsuario } from "../../services/usuarioService";
import { agregarPermisos, eliminarPermisos } from "../../services/usuarioService";

function UsuarioDetalle(){

    const {id} = useParams();

    const [permisosAgregar, setPermisosAgregar] = useState([]);
    const [permisosEliminar, setPermisosEliminar] = useState([]);
    const navigate = useNavigate();

    const listaPermisos = [
        "ExpedienteAlta",
        "ExpedienteBaja",
        "ExpedienteModificar",
        "TramiteAlta",
        "TramiteBaja",
        "TramiteModificacion"
    ];

    //esta funcion configura la funcionalidad general de los checboxes
    function handleCheckboxChange(permiso, tipo) {
        if ( tipo === "agregar"){
            if(permisosAgregar.includes(permiso)){
                setPermisosAgregar(permisosAgregar.filter(p => p !== permiso));
            } else {
                setPermisosAgregar([...permisosAgregar, permiso]);
            }
        } else {
            if (permisosEliminar.includes(permiso)){
                setPermisosEliminar(permisosEliminar.filter(p => p !== permiso));
            } else {
                setPermisosEliminar([...permisosEliminar, permiso]);
            }
        }
    }

    async function handleAgregarPermisos(){
        if(permisosAgregar.length == 0){
            alert("Selecciona al menos un permiso para agregar");
            return;
        }

        try{
            await agregarPermisos(id, permisosAgregar);
            alert("permisos agregados correctamente");
            setPermisosAgregar([]);
        } catch (error){
            alert(error.message);
        }
    }

    async function handleEliminarPermisos(){
        if(permisosEliminar.length == 0){
            alert("Selecciona al menos un permiso para eliminar");
            return;
        }

        try{
            await eliminarPermisos(id, permisosEliminar);
            alert("permisos borrados correctamente");
            setPermisosEliminar([]);
        } catch (error){
            alert(error.message);
        }
    }

    async function handleEliminarUsuario(id){
        const confirmar = window.confirm(
            "Estas seguro de eliminar el usuario?"
        );
        
        if(!confirmar){
            return;
        }
        
        
        try{
            await eliminarUsuario(id);
            navigate("/usuarios");
        } catch (error) {
            alert(error.message)
        }
    }

    return(
        <>
            
            <div className="usuario-container">
                <h1>Detalle del usuario</h1>
                <Button texto="Eliminar usuario" onClick={() => handleEliminarUsuario(id)}></Button>








                <div className="agregar-permisos">
                    <h3>Agregar permisos</h3>
                    {listaPermisos.map(permiso => (
                        <div key={`agregar-${permiso}`}>
                            <label>
                                <Input type="checkbox" checked = {permisosAgregar.includes(permiso)} onChange={() => handleCheckboxChange(permiso, "agregar")}/>
                                {permiso}
                            </label>
                        </div>
                    ))}
                    <Button texto="agregar permisos" onClick={handleAgregarPermisos}></Button>
                </div>

                <div className="eliminar-permisos">
                    <h3>Eliminar permisos</h3>
                    {listaPermisos.map(permiso => (
                        <div key={`eliminar-${permiso}`}>
                            <label>
                                <Input type="checkbox" checked = {permisosEliminar.includes(permiso)} onChange={() => handleCheckboxChange(permiso, "eliminar")}/>
                                {permiso}
                            </label>
                        </div>
                    ))}
                    <Button texto="eliminar permisos" onClick={handleEliminarPermisos}></Button>
                </div>

            
            </div>
        </>
    );
}

export default UsuarioDetalle;