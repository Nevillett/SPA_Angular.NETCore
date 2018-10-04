using System.Threading.Tasks;

namespace SPA_Angular.NETCore.Persistence
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}