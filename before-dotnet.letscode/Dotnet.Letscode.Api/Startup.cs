using System;
using Dotnet.Letscode.Api.Hub;
using Dotnet.Letscode.Api.Services;
using Dotnet.Letscode.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Dotnet.Letscode.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // If you want a local database run in Tools > Nuget Package Manager > Package Manager Console
            // Run command :  Update-Database -Project Dotnet.Letscode.Data -StartupProject Dotnet.Letscode.Api
            //services.AddDbContext<ChatDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ChatDataContext")), ServiceLifetime.Transient);
            services.AddDbContext<ChatDataContext>(options => options.UseInMemoryDatabase("ChatDataContext"), ServiceLifetime.Transient);

            services.AddControllers();

            services.AddCors();


            services.AddApiVersioning(o => o.ReportApiVersions = true);

            //todo use swagger


            services.AddTransient<IChannelService, ChannelService>();
            
            //todo register the MessageService

            services.AddTransient<IChannelRepository, ChannelRepository>();
            services.AddTransient<IMessageRepository, MessageRepository>();

            services.AddTransient<IContextFactory>((s) =>  new ContextFactory(() => s.GetService<ChatDataContext>()) );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            var origins = Configuration["AllowOrigins"].Split(",", StringSplitOptions.RemoveEmptyEntries);

            app.UseCors(builder => builder.WithOrigins(origins)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            //todo use swagger

            app.UseRouting();

            app.UseApiVersioning();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }

    
}
