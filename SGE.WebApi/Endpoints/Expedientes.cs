using SGE.Aplicacion.Expedientes.Agregar;
using SGE.Aplicacion.Expedientes.ObtenerTodos;
using SGE.Aplicacion.Expedientes.Eliminar;
using SGE.Aplicacion.Expedientes.Modificar;
using SGE.Aplicacion.Expedientes.ObtenerPorId;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SGE.WebApi.Endpoints;

public static class ExpedientesEndpoints
{
    public static IEndpointRouteBuilder MapExpedientesEndpoints(this IEndpointRouteBuilder app)
    {
        var grupo = app.MapGroup("/expedientes").WithTags("Expedientes");

        // ----    METODOS GET ----
        grupo.MapGet("/obtener-todos", ([FromServices]ObtenerTodosUseCase useCase) =>
        {
            var resultado = useCase.Ejecutar(new ObtenerTodosRequest());
            return Results.Ok(resultado);
        });

        grupo.MapGet("/obtener-por-id/{id}", (Guid id, [FromServices] SGE.Aplicacion.Expedientes.ObtenerPorId.ObtenerPorIdUseCase useCase) =>
        {
            var request = new ObtenerPorIdRequest(id); 
            var resultado = useCase.Ejecutar(request);
            return Results.Ok(resultado);
        }).WithName("ObtenerExpedientePorId");

        //---- METODOS POST ----
        grupo.MapPost("/agregar-expediente", (AgregarExpedienteRequest request, ClaimsPrincipal user, AgregarExpedienteUseCase useCase) =>
        {
            var idUsuario = Guid.Parse(user.FindFirst("ID")!.Value);
            var resultado = useCase.Ejecutar(request, idUsuario);
            return Results.Created($"/expedientes/{resultado.id}", resultado);
        }).RequireAuthorization();

        //---- METODO DELETE ----
        grupo.MapDelete("/eliminar-expediente/{id}", (Guid id, ClaimsPrincipal user, EliminarExpedienteUseCase useCase) =>
        {
            var idUsuario = Guid.Parse(user.FindFirst("ID")!.Value);
            var resultado = useCase.Ejecutar(new EliminarExpedienteRequest(id), idUsuario);
            return Results.Ok(resultado);
        }).RequireAuthorization();

        //---- METODOS PUT ----
        grupo.MapPut("/modificar-caratula/{id}", (Guid id, ModificarCaratulaExpedienteRequest request, ClaimsPrincipal user, ModificarCaratulaExpedienteUseCase useCase) =>
        {
            var idUsuario = Guid.Parse(user.FindFirst("ID")!.Value);
            var resultado = useCase.Ejecutar(request, idUsuario, id);
            return Results.Ok(resultado);
        }).RequireAuthorization();

        grupo.MapPut("/cambiar-estado/{id}", (Guid id, CambiarEstadoRequest request, ClaimsPrincipal user, CambiarEstadoUseCase useCase) =>
        {
            var idUsuario = Guid.Parse(user.FindFirst("ID")!.Value);
            var resultado = useCase.Ejecutar(request, idUsuario, id);
            return Results.Ok(resultado);
        }).RequireAuthorization();

        return app;
    }
}