using System;
using System.Collections.Generic;

namespace Dotnet.Letscode.Models
{
    public class Channel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Message> Messages { get; set; }

        public Channel()
        {
            Messages = new List<Message>();
        }
    }
}
