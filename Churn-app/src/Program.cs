using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using Churn_app.Data;

var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddControllers();

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer("Server=.\\SQLEXPRESS;Database=RestauranteChurn;Trusted_Connection=True;TrustServerCertificate=True"));

var app = builder.Build();

// Middleware
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Frontend")),
    RequestPath = ""
});

app.UseSession();

app.UseRouting();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();