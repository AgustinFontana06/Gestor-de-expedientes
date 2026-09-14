//importar componentes para crear la pagina
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { modificarTramite} from "../../services/tramiteService";

function ModificarTramite(){

    const navigate = useNavigate();

    const { id } = useParams();

    const[contenido, setContenido] = useState("");


    async function handleModificar(){
        try{
            await modificarTramite(id, contenido);

            navigate(`/tramites/${id}`);
        } catch (error){
            alert(error.message);
        }
    }

    return(
        <div className = "modificar-container">
            <div className="modificar-card">
                <h1>MODIFICAR TRAMITE</h1>
                <Input value={contenido} onChange={(e) => setContenido(e.target.value)} type = "contenido" placeholder = "contenido"></Input>
                <Button texto = "Modificar" onClick={handleModificar}></Button>
            </div>
        </div>
    );
}

export default ModificarTramite;