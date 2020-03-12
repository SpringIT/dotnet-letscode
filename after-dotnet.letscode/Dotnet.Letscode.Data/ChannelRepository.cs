using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dotnet.Letscode.Models;
using Microsoft.EntityFrameworkCore;

namespace Dotnet.Letscode.Data
{
    public class ChannelRepository : IChannelRepository
    {
        private readonly IContextFactory _contextFactory;

        public ChannelRepository(IContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<IList<ChannelDetails>> Get()
        {
            using (var context = this._contextFactory.Create())
            {

                return await context.Channels
                    .Include(c => c.Messages)
                    .Select(c => new ChannelDetails
                    {
                        Id = c.Id,
                        Name = c.Name,
                        MessageCount = c.Messages.Count
                    })
                    .ToListAsync();
            }
        }

        public async Task Add(Channel channel)
        {
            //todo implement adding saving a channel

            using (var context = this._contextFactory.Create())
            {
                context.Channels.Add(channel);
                await context.SaveChangesAsync();

            }
        }

        public async Task Delete(Guid id)
        {
            using (var context = this._contextFactory.Create())
            {
                var channel = await context.Channels.SingleAsync(c => c.Id == id);
                context.Channels.Remove(channel);
                await context.SaveChangesAsync();

            }
        }

        public async Task<Channel> Get(Guid id)
        {
            using (var context = this._contextFactory.Create())
            {
                return await context.Channels
                    .Include(c => c.Messages)
                    .SingleAsync(c => c.Id == id);
            }
        }
    }
}