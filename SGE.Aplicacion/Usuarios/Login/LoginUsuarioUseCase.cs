using SGE.Aplicacion.Abstracciones;
using SGE.Aplicacion.Excepciones;
using SGE.Dominio.Usuarios;
using SGE.Dominio.Excepciones;
namespace SGE.Aplicacion.Usuarios.Login;

public class LoginUsuarioUseCase(IUsuarioRepository usuarioRepository,ITokenProvider tokenProvider, IHashService hashService)
{
    public LoginUsuarioResponse Ejecutar( LoginUsuarioRequest request)
    {
        DireccionEmail emailIngresado;
         // 1. Delegamos la validación al Dominio intentando crear el Value Object
        try
        {
            emailIngresado = DireccionEmail.Parse(request.email);
        }
        catch (DominioException) // Atrapamos la regla de dominio rota
        {
            throw new AutorizacionException("El formato del email o la contraseña son incorrectos.");
        }
 //
        var usuarioBuscado = usuarioRepository.obtenerPorEmail(emailIngresado);
        if (usuarioBuscado == null)
        {
            throw new EntidadNoEncontradaException("El usuario con el que se esta queriendo loguear no existe.");
        }

        // Asumiendo que usuarioBuscado tiene una propiedad Password donde se almacena el hash
        if(usuarioBuscado.ContrasenaHash != hashService.Hash(request.password))
        {
           throw new AutorizacionException($"las credenciales utilizadas para el email {request.email} no son validas.");
        }
        // 4. Delegamos la creación del token a la infraestructura
        var token = tokenProvider.GenerarToken(usuarioBuscado);
        return new LoginUsuarioResponse(token);
    }
}