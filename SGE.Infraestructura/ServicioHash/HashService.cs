namespace SGE.Infraestructura.ServicioHash;

using SGE.Aplicacion.Abstracciones;
using System.Security.Cryptography;
using System.Text;

public class HashService : IHashService
{
    public string Hash(string texto)
    {
        return Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(texto)));
    }
}