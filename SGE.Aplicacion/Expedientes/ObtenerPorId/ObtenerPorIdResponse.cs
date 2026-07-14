namespace SGE.Aplicacion.Expedientes.ObtenerPorId;
using SGE.Dominio.Expedientes;
using SGE.Dominio.Tramites;
public record class ObtenerPorIdResponse(Guid Id,string Caratula,EstadoExpediente Estado,DateTime FechaCreacion,DateTime FechaUltimaModificacion,Guid UsuarioUltimoCambio, IEnumerable<Tramite> Tramites);