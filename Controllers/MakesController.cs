using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPA_Angular.NETCore.Controllers.Resources;
using SPA_Angular.NETCore.Core.Models;
using SPA_Angular.NETCore.Persistence;

namespace SPA_Angular.NETCore.Controllers
{
    public class MakesController : Controller
    {
        private readonly SpaDbContext context;
        private readonly IMapper mapper;
        public MakesController(SpaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpGet("api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await context.Makes.Include(m => m.Models).ToListAsync();
            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}