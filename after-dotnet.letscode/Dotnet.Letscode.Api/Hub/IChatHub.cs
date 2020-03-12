using System.Collections.Generic;
using System.Threading.Tasks;
using Dotnet.Letscode.Models;

namespace Dotnet.Letscode.Api.Hub
{
    public interface IChatHub
    {
        Task ChannelCreated(Channel channel);
        Task ChannelDeleted(Channel channel);
        Task ChannelListUpdated(IList<ChannelDetails> channels);
        Task MessageReceived(Message message);
        Task JoinedChannel(Channel channel);
        Task LeftChannel(Channel channel);
    }
}
