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

        public async Task Send(Message message)
        {
            //todo implement message sending

            await _messageService.Add(message);
            await Clients.Group(message.ChannelId.ToString()).MessageReceived(message);

            await UpdateChannelList();
        }

        public async Task Join(Channel channel)
        {
            //todo implement joining a channel

            await Groups.AddToGroupAsync(Context.ConnectionId, channel.Id.ToString());

            var c = await _channelService.Get(channel.Id);
            await Clients.Caller.JoinedChannel(c);

            await UpdateChannelList();
        }

        private async Task UpdateChannelList()
        {
            var channels = await _channelService.Get();
            await Clients.All.ChannelListUpdated(channels);
        }


    }
}