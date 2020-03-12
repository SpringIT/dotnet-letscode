using System;
using System.Threading.Tasks;
using Dotnet.Letscode.Data;
using Dotnet.Letscode.Models;
using Microsoft.Extensions.Logging;

namespace Dotnet.Letscode.Api.Services
{
    public class MessageService : IMessageService
    {
        //todo implement the MessageService

        private readonly IMessageRepository _messageRepository;

        public MessageService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public Task Add(Message message)
        {
            if(message.Id == Guid.Empty) message.Id = Guid.NewGuid();
            return _messageRepository.Add(message);
        }

    }
}