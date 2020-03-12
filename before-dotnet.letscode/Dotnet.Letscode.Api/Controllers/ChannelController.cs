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
    public class ChannelController : ControllerBase
    {
        private readonly IChannelService _channelService;
        private readonly IHubContext<ChatHub, IChatHub> _hubContext;

        public ChannelController(IChannelService channelService, IHubContext<ChatHub, IChatHub> hubContext)
        {
            _channelService = channelService;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task Create(Channel channel)
        {
            await _channelService.Add(channel);
            var channels = await _channelService.Get();
            await _hubContext.Clients.All.ChannelListUpdated(channels);

        }

        [Route("{id}")]
        [HttpDelete]
        public async Task Delete(Guid id)
        {
            var channel = await _channelService.Get(id);
            await _channelService.Delete(id);
            
            await _hubContext.Clients.All.LeftChannel(channel);

            var channels = await _channelService.Get();
            await _hubContext.Clients.All.ChannelListUpdated(channels);
        }
    }
}
