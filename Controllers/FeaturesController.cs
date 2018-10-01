using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPA_Angular.NETCore.Controllers.Resources;
using SPA_Angular.NETCore.Models;
using SPA_Angular.NETCore.Persistence;

namespace SPA_Angular.NETCore.Controllers
{
    public class FeaturesController
    {
        private readonly SpaDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(SpaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<FeatureResource>> GetFeatures()
        {
            var features = await context.Features.ToListAsync();
            return mapper.Map<List<Feature>, List<FeatureResource>>(features);
        }
    }
}