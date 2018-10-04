using System.Threading.Tasks;
using SPA_Angular.NETCore.Models;

namespace SPA_Angular.NETCore.Persistence
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);

    }
}