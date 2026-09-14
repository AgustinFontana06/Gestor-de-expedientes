import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { obtenerUsuarios } from "../../services/usuarioService";

function Usuarios(){

    const [usuarios, setUsuarios] = useState([]);

    const navigate = useNavigate();

    async function handleVerUsuario(id){
        navigate(`/usuarios/${id}`);
    }

    useEffect(() => {

        async function handleCargarUsuarios() {
            try{
                const response = await obtenerUsuarios();

                console.log(response);

                setUsuarios(response.usuarios);
            } catch (error) {
                alert(error.message);
            }
        }

        handleCargarUsuarios();
    }, []);


    return(
        <>
            <h2>Usuarios</h2>
            <table>
                <thead>
                    <tr>
                    <th>nombre</th>
                    <th>mail</th>
                    <th>permisos</th>
                    <th>es administrador</th>
                    <th>acciones</th>
                    </tr>
                </thead>

                <tbody >
                    {usuarios.map(usuario => (
                    <tr key={usuario.id}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.permisos.join(", ")}</td>
                        <td>{usuario.esAdministrador ? "Si" : "No"}</td>
                        <td>
                            <Button onClick={() => handleVerUsuario(usuario.id)}>Ver</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            

        </>
    );
}

export default Usuarios;