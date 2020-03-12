using System;

namespace Dotnet.Letscode.Data
{
    public class ContextFactory : IContextFactory
    {
        private readonly Func<ChatDataContext> _factoryMethod;

        public ContextFactory(Func<ChatDataContext> factoryMethod)
        {
            _factoryMethod = factoryMethod;
        }

        public ChatDataContext Create()
        {
            return _factoryMethod.Invoke();
        }
    }
}