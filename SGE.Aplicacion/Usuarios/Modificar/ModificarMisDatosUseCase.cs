using SGE.Aplicacion.Abstracciones;
using SGE.Aplicacion.Excepciones;
using SGE.Dominio.Usuarios;


namespace SGE.Aplicacion.Usuarios.Modificar;
public class ModificarMisDatosUseCase(IUsuarioRepository usuarioRepository, IUnidadDeTrabajo udt, IHashService hashService)
{
    public ModificarMisDatosResponse Ejecutar(ModificarMisDatosRequest request, Guid usuarioAutenticadoId)
    {
        var usuario = usuarioRepository.ObtenerPorId(usuarioAutenticadoId);
        if (usuario == null)
        {
            throw new EntidadNoEncontradaException("Usuario no encontrado");
        }

        usuario.ModificarDatos(request.nombre, DireccionEmail.Parse(request.email), hashService.Hash(request.contraseña));

        usuarioRepository.Modificar(usuario);
        udt.Guardar();
        return new ModificarMisDatosResponse(usuario.Id);
    }
}