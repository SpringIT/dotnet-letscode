using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dotnet.Letscode.Data;
using Dotnet.Letscode.Models;
using Microsoft.Extensions.Logging;

namespace Dotnet.Letscode.Api.Services
{
    public class ChannelService : IChannelService
    {
        private readonly ILogger<ChannelService> _logger;
        private readonly IChannelRepository _channelRepository;

        public ChannelService(ILogger<ChannelService> logger, IChannelRepository channelRepository)
        {
            _logger = logger;
            _channelRepository = channelRepository;
        }

        public  Task<IList<ChannelDetails>> Get()
        {
            return _channelRepository.Get();
        }

        public async Task Add(Channel channel)
        {
            await _channelRepository.Add(channel);
        }

        public async Task Delete(Guid id)
        {
            await _channelRepository.Delete(id);
        }

        public Task<Channel> Get(Guid id)
        {
            return _channelRepository.Get(id);
        }
    }
}