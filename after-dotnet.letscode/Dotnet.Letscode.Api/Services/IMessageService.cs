using System.Threading.Tasks;
using Dotnet.Letscode.Models;

namespace Dotnet.Letscode.Api.Services
{
    public interface IMessageService
    {
        Task Add(Message message);
    }
}