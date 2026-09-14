import { useEffect, useState } from "react";
import { obtenerExpedientes } from "../../services/expedienteService";
import { useNavigate } from "react-router-dom";
import { agregarExpediente } from "../../services/expedienteService";
import  Button  from "../../components/Button";
import Input from "../../components/Input";
import "./Expedientes.css";

function Expedientes() {

    const navigate = useNavigate();

    const[expedientes, setExpedientes] = useState([]);
    const[caratula, setCaratula] = useState("");

    async function handleAgregarExpediente(){
        try{
            await agregarExpediente(caratula);  
            
            const respuesta = await obtenerExpedientes();

            setExpedientes(respuesta.expedientes);

            setCaratula("");
        }
        catch(error){
            alert(error.message);
        }
    }

    function handleVerExpediente(id){
        navigate(`/expedientes/${id}`);
    }

    //en el instante que se monta el componente (o sea que se muestra) se activa el use effect
    useEffect(() => {
        
        async function cargarExpedientes() {

            try{

                const response = await obtenerExpedientes();
                
                //actualiza el estado de vacio a los elementos que encontro
                setExpedientes(response.expedientes);
            } catch (error){
                alert(error.message);
            }
        }

        //llama a la funcion
        cargarExpedientes();
    }, []);

    return(
        <>
            <h1>Expedientes</h1>
            <table>
            <thead>
                <tr>
                    <th>Carátula</th>
                    <th>Estado</th>
                    <th>Fecha creación</th>
                    <th>Última modificación</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>

                {expedientes.map(expediente => (

                    <tr key={expediente.id}>

                        <td>
                            {expediente.caratula}
                        </td>

                        <td>
                            {expediente.estado}
                        </td>

                        <td>
                            {new Date(expediente.fechaCreacion).toLocaleDateString()}
                        </td>

                        <td>
                            {new Date(expediente.fechaUltimaModificacion).toLocaleDateString()}
                        </td>

                        <td>
                            <button onClick={() => handleVerExpediente(expediente.id)}>Ver</button>
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

        <div className="inputs">
        <h2>Caratula</h2><Input className="input" value={caratula} onChange={(e) => setCaratula(e.target.value)}></Input>        </div>
        <Button className="agregar-expediente" texto="Agregar Expediente" onClick={handleAgregarExpediente}></Button>
        </>
    )
}

export default Expedientes;