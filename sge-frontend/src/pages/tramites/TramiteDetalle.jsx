import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerTramite } from "../../services/tramiteService";
import { eliminarTramite } from "../../services/tramiteService";
import  Button  from "../../components/Button";
import "./TramiteDetalle.css";

function TramiteDetalle(){

    const { id } = useParams();

    const navigate = useNavigate();

    const[tramite, setTramite] = useState(null);

    async function handleModificarTramite(){
        navigate(`/tramites/${id}/modificar`);
    }

    async function handleEliminarTramite(){
            const confirmar = window.confirm(
                "Estas seguro de eliminar el expediente?"
            );
            
            if(!confirmar){
                return;
            }
            
            try{
                await eliminarTramite(id);
                navigate(`/expedientes/${tramite.expedienteId}`);
            } catch (error) {
                alert(error.message)
            }
        }

    useEffect(() => {

        async function cargarTramite() {
            try {
                console.log("ID DEL TRAMITE: ", id);
                const response = await obtenerTramite(id);

                console.log("RESPUESTA: ", response);

                setTramite(response);
            } catch(error) {
                alert(error.message);
            }
        }

        cargarTramite();
    }, [id]);

    return(
        <>
            <div className="tramite-detalle">
                        <h1>Detalle del Tramite</h1>
                                    
                        <div className="container-tramite">
                        {tramite && (
            
                            <div className="container-tramite">
                                <p><strong>Etiqueta: </strong>{tramite.etiqueta}</p>
            
                                <p><strong>Contenido: </strong>{tramite.contenido.texto}</p>
            
                                <p><strong>Fecha de creacion: </strong>{" "}
                                    {new Date(tramite.fechaDeCreacion).toLocaleDateString()}</p>
            
                                <p><strong>Ultima modificacion: </strong>{" "}
                                    {new Date(tramite.fechaUltimoCambio).toLocaleDateString()}</p>
                            </div>
                        )}
                        </div>
                        
            </div>
            <Button texto="Modificar" onClick={() => handleModificarTramite()}></Button>
            <Button texto="Eliminar" onClick={() => handleEliminarTramite()}></Button>
            </>
    );
}

export default TramiteDetalle;