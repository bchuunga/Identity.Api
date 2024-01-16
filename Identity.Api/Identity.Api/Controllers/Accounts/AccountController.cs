using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Identity.Api.Dtos;
using Identity.Api.Models;
using Identity.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers.Accounts
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public AccountController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IMapper mapper,
            JwtService jwtService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto userDto)
        {
            var userExists = await _userManager.FindByEmailAsync(userDto.Email);
            if (userExists != null)
            {
                return BadRequest($"{userDto.Email} is already registered.");
            }

            var user = _mapper.Map<User>(userDto);
            user.EmailConfirmed = true;
            user.UserName = userDto.Email;

            var result = await _userManager.CreateAsync(user, userDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Account created");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto userDto)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(userDto.Email);
                if (user == null) { return Unauthorized("Invalid username or password"); }
                if (user.EmailConfirmed == false) { return Unauthorized("Please confirm your email."); }

                var result = await _signInManager.CheckPasswordSignInAsync(user, userDto.Password, false);
                if (!result.Succeeded)
                {
                    return Unauthorized("Invalid username or password");
                }

                var newUserDto = _mapper.Map<UserDto>(user);
                newUserDto.Token = _jwtService.CreateJwt(user);
                return newUserDto;
            }

            return Ok(ModelState);
        }

        [Authorize]
        [HttpGet("refresh-token")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var userL = User;
            var user = await _userManager.FindByEmailAsync(User.FindFirst(ClaimTypes.Email)?.Value);
            var userDto = _mapper.Map<UserDto>(user);
            userDto.Token = _jwtService.CreateJwt(user);
            return Ok(userDto);
        }
    }
}
