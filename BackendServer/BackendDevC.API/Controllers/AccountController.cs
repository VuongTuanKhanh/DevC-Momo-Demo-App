using BackendDevC.API.Filters;
using BackendDevC.API.ViewModels;
using BackendDevC.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackendDevC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateModel]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, true);
                if (!result.Succeeded)
                    return BadRequest("Wrong passsword");
                if (result.IsLockedOut)
                    return new ObjectResult(new { message = "Account has been block" });
                var roles = await _userManager.GetRolesAsync(user);
                var claims = new[]
                {
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("UserName", user.UserName),
                        new Claim("Roles", string.Join(";", roles)),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(_configuration["Tokens:Issuer"],
                    _configuration["Tokens:Issuer"],
                     claims,
                    expires: DateTime.Now.AddDays(2),
                    signingCredentials: creds);

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            return NotFound($"Account {model.Email} not found ");
        }

        [HttpPost("GetUserId")]
        public async Task<IActionResult> GetUserId(LoginViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return NotFound();
            return Ok(new {Id= user.UserGuid });
        }
    }
}