using Dotnet.Letscode.Models;
using Microsoft.EntityFrameworkCore;

namespace Dotnet.Letscode.Data
{
    public class ChatDataContext: DbContext
    {
        public ChatDataContext(DbContextOptions<ChatDataContext> options)
            : base(options)
        {
        }

        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
