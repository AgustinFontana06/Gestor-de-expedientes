namespace SGE.Aplicacion.Expedientes.ObtenerTodos;
using SGE.Aplicacion.Expedientes.ObtenerPorId;
using SGE.Dominio.Expedientes;


public record ExpedienteResumen(
    Guid Id,
    string Caratula,
    EstadoExpediente Estado,
    DateTime FechaCreacion,
    DateTime FechaUltimaModificacion,
    Guid UsuarioUltimoCambio
);

public record class ObtenerTodosResponse(IEnumerable<ExpedienteResumen> Expedientes);