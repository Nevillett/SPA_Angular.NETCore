using System.Threading.Tasks;

namespace SPA_Angular.NETCore.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SpaDbContext context;
        public UnitOfWork(SpaDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}