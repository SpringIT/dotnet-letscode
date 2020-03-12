using System.Threading.Tasks;
using Dotnet.Letscode.Models;

namespace Dotnet.Letscode.Data
{
    public interface IMessageRepository
    {
        Task Add(Message message);
    }
}