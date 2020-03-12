using System;
using System.Threading.Tasks;
using Dotnet.Letscode.Api.Services;
using Dotnet.Letscode.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace Dotnet.Letscode.Api.Hub
{
    public class ChatHub : Hub<IChatHub>, IServerChatHub
    {
        private readonly IChannelService _channelService;
        private readonly IMessageService _messageService;

        public ChatHub(IServiceProvider provider)
        {
            _channelService = provider.GetService<IChannelService>();
            _messageService = provider.GetService<IMessageService>();
        }

        public override async Task OnConnectedAsync()
        {
            var channels = await _channelService.Get();
            await Clients.Caller.ChannelListUpdated(channels);
        }

        public Task Send(Message message)
        {
            //todo implement message sending
        }

        public Task Join(Channel channel)
        {
            //todo implement joining a channel
        }

        private async Task UpdateChannelList()
        {
            var channels = await _channelService.Get();
            await Clients.All.ChannelListUpdated(channels);
        }
    }
}