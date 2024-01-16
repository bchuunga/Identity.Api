using AutoMapper;
using Identity.Api.Dtos;
using Identity.Api.Models;

namespace Identity.Api.Profiles
{
    public class IdentityApiMapper : Profile
    {
        public IdentityApiMapper()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<User, UserDto>();
        }
    }
}
