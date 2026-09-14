//importar componentes para crear la pagina
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./ModificarExpediente.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { modificarCaratula, cambiarEstado} from "../../services/expedienteService";

function ModificarExpediente(){

    const navigate = useNavigate();

    const { id } = useParams();

    const[caratula, setCaratula] = useState("");
    const[estado, setEstado] = useState("");


    async function handleModificar(){
        try{
            
            if(caratula != ""){
                await modificarCaratula(id, caratula);
            }
            
            if(estado != ""){
                await cambiarEstado(id, estado);
            }
            

            navigate(`/expedientes/${id}`);
        } catch (error){
            alert(error.message);
        }
    }

    return(
        <div className = "modificar-container">
            <div className="modificar-card">
                <h1>MODIFICAR EXPEDIENTE</h1>
                <Input value={caratula} onChange={(e) => setCaratula(e.target.value)} type = "caratula" placeholder = "caratula"></Input>
                <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="">Seleccionar estado</option>
                    <option value="RecienIniciado">Recién iniciado</option>
                    <option value="ParaResolver">Para resolver</option>
                    <option value="ConResolucion">Con resolución</option>
                    <option value="EnNotificacion">En notificación</option>
                    <option value="Finalizado">Finalizado</option>
                </select>
                <Button texto = "Modificar" onClick={handleModificar}></Button>
            </div>
        </div>
    );
}

export default ModificarExpediente;