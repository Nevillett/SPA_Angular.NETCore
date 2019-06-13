using System.Threading.Tasks;

namespace SPA_Angular.NETCore.Core
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}