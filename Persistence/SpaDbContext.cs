using Microsoft.EntityFrameworkCore;
using SPA_Angular.NETCore.Models;

namespace SPA_Angular.NETCore.Persistence
{
    public class SpaDbContext: DbContext
    {
        public SpaDbContext(DbContextOptions<SpaDbContext> options) : base(options)
        {
            
        }

        public DbSet<Make> Makes { get; set; }
    }
}