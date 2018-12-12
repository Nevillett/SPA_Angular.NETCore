using System.Collections.Generic;
using System.Threading.Tasks;
using SPA_Angular.NETCore.Core.Models;

namespace SPA_Angular.NETCore.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);

        Task<IEnumerable<Vehicle>> GetVehicles(Filter filter);
    }
}