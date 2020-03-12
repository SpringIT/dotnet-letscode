using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dotnet.Letscode.Api.Hub;
using Dotnet.Letscode.Api.Services;
using Dotnet.Letscode.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Dotnet.Letscode.Api.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IChannelService _channelService;
        private readonly IHubContext<ChatHub, IChatHub> _hubContext;

        public MessageController(IMessageService messageService, IChannelService channelService, IHubContext<ChatHub, IChatHub> hubContext)
        {
            _messageService = messageService;
            _channelService = channelService;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task Create(Message message)
        {
            await _messageService.Add(message);

            //todo send the message to the channel group
            await _hubContext.Clients.Group(message.ChannelId.ToString()).MessageReceived(message);

            var channels = await _channelService.Get();
            await _hubContext.Clients.All.ChannelListUpdated(channels);
        }
    }
}
