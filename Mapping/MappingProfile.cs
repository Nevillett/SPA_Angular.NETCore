using AutoMapper;
using SPA_Angular.NETCore.Controllers.Resources;
using SPA_Angular.NETCore.Models;

namespace SPA_Angular.NETCore.Mapping
{
    public class MappingProfile: Profile
    {   
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();   
            CreateMap<Model, ModelResource>();
        }
    }
}