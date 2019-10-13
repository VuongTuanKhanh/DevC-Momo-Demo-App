using BackendDevC.Infrastructure.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BackendDevC.Data.Entities
{
    public class Role : IdentityRole<long>, IEntityWithTypedId<long>
    {
        public IList<UserRole> Users { get; set; } = new List<UserRole>();
    }
}