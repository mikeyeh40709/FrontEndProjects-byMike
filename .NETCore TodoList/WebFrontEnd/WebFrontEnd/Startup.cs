using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace WebFrontEnd
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
            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "HtmlPages")),
                RequestPath = "/HtmlPages"
            });

            app.UseRouting();

            app.UseAuthorization();

            //��}�ӷ|������O�귽
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "Phone", //�H�x�N�q
                    pattern: "iphone",
                    defaults: new { controller = "Phone", action = "index" }
                    );
                endpoints.MapControllerRoute(
                    name: "Pad",
                    pattern: "ipad",
                    defaults: new { controller = "Pad", action = "index" }
                    );
                endpoints.MapControllerRoute(
                    name: "Mac",
                    pattern: "mac",
                    defaults: new { controller = "Mac", action = "index" }
                    );
                endpoints.MapControllerRoute(
                    name: "Watch",
                    pattern: "watch",
                    defaults: new { controller = "Watch", action = "index" }
                    );
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
