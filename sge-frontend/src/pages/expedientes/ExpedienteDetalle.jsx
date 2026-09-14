import { useNavigate, useParams } from "react-router-dom";
import { obtenerExpedientePorId } from "../../services/expedienteService";
import { obtenerTramites } from "../../services/tramiteService";
import { eliminarExpediente } from "../../services/expedienteService";
import { useState, useEffect, Fragment } from "react";
import { agregarTramite } from "../../services/tramiteService";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./ExpedienteDetalle.css";

function ExpedienteDetalle(){

    const { id } = useParams();

    const navigate = useNavigate();

    const[expediente, setExpediente] = useState(null);
    const [tramites, setTramites] = useState([]);

    const [contenido, setContenido] = useState("");

    const estados = [
        "RecienIniciado",
        "ParaResolver",
        "ConResolucion",
        "EnNotificacion",
        "Finalizado"
    ];

    async function handleAgregarTramite(){
        try{
            await agregarTramite(id, contenido);  
                        
            const respuesta = await obtenerTramites(id);
            
            setTramites(respuesta.tramites);
            
            setContenido("");
        }
        catch(error){
            alert(error.message);
        }
    }

    async function handleVerTramite(id){
        navigate(`/tramites/${id}`);
    }

    async function handleModificarExpediente(){
        navigate(`/expedientes/${id}/modificar`);
    }


    async function handleEliminarExpediente(id){

            const confirmar = window.confirm(
                "Estas seguro de eliminar el expediente?"
            );

            if(!confirmar){
                return;
            }

            //el endpoint se encarga de toda la logica del delete, por lo tanto solo hay que usar volver a la tabla de expedientes,
            //como todo esto esta dentro del use effect, cada vez que se recarga o se redirige a la parte de expedientes, cada handle
            //se vuelve a cargar, por lo que el handle de cargarExpediente() se carga nuevamente sin el expediente eliminado, esto
            //evita tener que hacer un setExpedientes()

            try{
                await eliminarExpediente(id);

                navigate("/expedientes");
            } catch (error) {
                alert(error.message)
            }
        }


    //en el instante que se monta el componente (o sea que se muestra) se activa el use effect
    useEffect(() => {
        
        

        async function cargarExpediente() {

            try{

                const response = await obtenerExpedientePorId(id);
                
                //actualiza el estado de vacio a los elementos que encontro
                setExpediente(response);
            } catch (error){
                alert(error.message);
            }
        }

        async function cargarTramites(){

            try{
                const response = await obtenerTramites(id);

                setTramites(response.tramites);
            } catch (error){
                alert(error.message);
            }
        }

        
        
        //llama a la funcion
        cargarExpediente();
        cargarTramites();
    }, [id]);

    //mientras se carguen los datos
    if(!expediente){
        return <p>Cargando expediente...</p>
    }

    const estadoActual = estados.indexOf(expediente.estado);

    return(
        <>
        <div className="expediente-detalle">
            <h1>Detalle del Expediente</h1>
            
            <div className="detalle-superior">

            <div className="container-expediente">
            {expediente && (

                <div className="container-expediente">
                    <p><strong>Caratula: </strong>{expediente.caratula}</p>

                    <p><strong>Estado: </strong>{expediente.estado}</p>

                    <p><strong>Fecha de creacion: </strong>{" "}
                        {new Date(expediente.fechaCreacion).toLocaleDateString()}</p>

                    <p><strong>Ultima modificacion: </strong>{" "}
                        {new Date(expediente.fechaUltimaModificacion).toLocaleDateString()}</p>
                </div>
            )}
            </div>

            <div className="estado-expediente">

                <h2>Estado del expediente</h2>

                    <div className="timeline">

                        {estados.map((estado, index) => (

                            <Fragment key={estado}>

                                <div
                                    className={`timeline-item ${
                                        index <= estadoActual
                                            ? "activo"
                                            : ""
                                    }`}
                                >

                                    <div className="timeline-dot"></div>

                                    <span>
                                        {estado}
                                    </span>

                                </div>


                                {/* Línea entre los puntos */}
                                {index < estados.length - 1 && (

                                    <div
                                        className={`timeline-line ${
                                            index < estadoActual
                                                ? "linea-activa"
                                                : ""
                                        }`}
                                    ></div>

                                )}

                            </Fragment>

                        ))}

                    </div>

                </div>
        </div>

        <div className="acciones-expediente">
            <Button texto="Modificar" onClick={() => handleModificarExpediente()}></Button>
            <Button texto="Eliminar" onClick={() => handleEliminarExpediente(id)}></Button>
        </div>

            <div className="tramites-container">

                <h2>Trámites</h2>

                {tramites.length === 0 ? (

                    <p>
                        Este expediente no tiene trámites.
                    </p>

                ) : (

                    <table>

                        <thead>

                            <tr>
                                <th>Etiqueta</th>
                                <th>Contenido</th>
                                <th>Fecha de creación</th>
                                <th>Última modificación</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>


                        <tbody>

                            {tramites.map(t => (

                                <tr key={t.id}>

                                    <td>
                                        {t.etiqueta}
                                    </td>

                                    <td>
                                        {t.contenido.texto}
                                    </td>

                                    <td>
                                        {new Date(
                                            t.fechaCreacion
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        {new Date(
                                            t.fechaUltimaModificacion
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <Button texto="Ver"onClick={() => handleVerTramite(t.id)} >
                                            
                                        </Button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>
            
            <div className="inputs">
            <h2>Contenido</h2><Input className="input" value={contenido} onChange={(e) => setContenido(e.target.value)}></Input>        
            <Button texto="Agregar Tramite" onClick={handleAgregarTramite}></Button>
            </div>

        </div>
        </>
    );

}

export default ExpedienteDetalle;