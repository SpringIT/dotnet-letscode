using System.Threading.Tasks;
using Dotnet.Letscode.Models;

namespace Dotnet.Letscode.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly IContextFactory _contextFactory;

        public MessageRepository(IContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task Add(Message message)
        {
            using (var context = _contextFactory.Create())
            {
                context.Messages.Add(message);
                await context.SaveChangesAsync();
            }
        }
    }
}