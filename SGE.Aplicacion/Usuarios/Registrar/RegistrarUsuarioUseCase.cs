namespace SGE.Aplicacion.Usuarios.Registrar;

using SGE.Aplicacion.Abstracciones;
using SGE.Aplicacion.Excepciones;
using SGE.Dominio.Usuarios;

public class RegistrarUsuarioUseCase(IUnidadDeTrabajo udt, IUsuarioRepository usuarioRepository, IHashService hashService)
{
    public RegistrarUsuarioResponse Ejecutar(RegistrarUsuarioRequest request)
    {
        //1.Validar que el usuario no existe
        if(usuarioRepository.ExisteUsuarioPorMail(request.email))
        {
            throw new EntidadNoEncontradaException("El usuario ya existe");
        }

        //2.Crear el usuario
        var hash = hashService.Hash(request.password);
        var usuario = new Usuario(request.nombre, DireccionEmail.Parse(request.email), hash);
        usuarioRepository.AgregarUsuario(usuario);
        udt.Guardar();
        return new RegistrarUsuarioResponse(usuario.Id);
    }
}