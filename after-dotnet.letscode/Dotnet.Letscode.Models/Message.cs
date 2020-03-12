using System;

namespace Dotnet.Letscode.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid ChannelId { get; set; }
        public string Value { get; set; }
    }
}