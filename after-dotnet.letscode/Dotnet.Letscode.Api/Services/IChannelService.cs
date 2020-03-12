using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dotnet.Letscode.Models;

namespace Dotnet.Letscode.Api.Services
{
    public interface IChannelService
    {
        Task<IList<ChannelDetails>> Get();
        Task Add(Channel channel);
        Task Delete(Guid id);
        Task<Channel> Get(Guid id);
    }
}