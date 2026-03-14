using Microsoft.EntityFrameworkCore;
using Churn_app.Models;

namespace Churn_app.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Cliente> Cliente { get; set; }
    }
}