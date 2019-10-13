using BackendDevC.Infrastructure.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendDevC.Data.Entities
{
    [Table("Core_User")]
    public class User : IdentityUser<long>, IEntityWithTypedId<long>
    {
        public User()
        {
        }

        public string UserGuid { get; set; }

        [Required(ErrorMessage = "The {0} field is required.")]
        [StringLength(128)]
        public string FullName { get; set; }

        public DateTimeOffset CreatedOn { get; set; }

        public DateTimeOffset LatestUpdatedOn { get; set; }

        public IList<UserRole> Roles { get; set; } = new List<UserRole>();
    }
}