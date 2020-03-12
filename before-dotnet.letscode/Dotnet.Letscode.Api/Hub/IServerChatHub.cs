using System.Threading.Tasks;
using Dotnet.Letscode.Models;

namespace Dotnet.Letscode.Api.Hub
{
    public interface IServerChatHub
    {
        Task Send(Message message);
        Task Join(Channel channel);
    }
}