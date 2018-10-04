using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SPA_Angular.NETCore.Core;
using SPA_Angular.NETCore.Core.Models;

namespace SPA_Angular.NETCore.Persistence
{
    public class VehicleRepository: IVehicleRepository
    {
        private readonly SpaDbContext context;
        public VehicleRepository(SpaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if(!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(md => md.Make)
            .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
    }
}