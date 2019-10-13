using BackendDevC.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDevC.Data.EF
{
    public class DbInitializer
    {
        private readonly AppDbContext _context;
        private UserManager<User> _userManager;
        private RoleManager<Role> _roleManager;

        public DbInitializer(AppDbContext context,
            UserManager<User> userManager,
            RoleManager<Role> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Seed()
        {
            if (!_roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new Role()
                {
                    Name = "Admin",
                    NormalizedName = "Admin"
                });
                await _roleManager.CreateAsync(new Role()
                {
                    Name = "Staff",
                    NormalizedName = "Staff"
                });
                await _roleManager.CreateAsync(new Role()
                {
                    Name = "Customer",
                    NormalizedName = "Customer"
                });
            }
            if (!_userManager.Users.Any())
            {
                await _userManager.CreateAsync(new User()
                {
                    UserName = "test",
                    FullName = "testcus",
                    Email = "test@gmail.com",
                    UserGuid= "9223308265286104988",
                    CreatedOn = DateTime.Now
                }, "123654$");
                var user = await _userManager.FindByNameAsync("test");
                await _userManager.AddToRoleAsync(user, "Customer");
            }
        }
    }
}