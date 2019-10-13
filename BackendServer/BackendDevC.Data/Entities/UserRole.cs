using Microsoft.AspNetCore.Identity;

namespace BackendDevC.Data.Entities
{
    public class UserRole : IdentityUserRole<long>
    {
        public override long UserId { get; set; }

        public User User { get; set; }

        public override long RoleId { get; set; }

        public Role Role { get; set; }
    }
}