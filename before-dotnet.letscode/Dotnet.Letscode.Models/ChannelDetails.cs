using System;

namespace Dotnet.Letscode.Models
{
    public class ChannelDetails
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int MessageCount { get; set; }
    }
}