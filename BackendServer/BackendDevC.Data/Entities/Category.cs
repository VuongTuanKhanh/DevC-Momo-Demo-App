using BackendDevC.Infrastructure.Models;
using System.ComponentModel.DataAnnotations;

namespace BackendDevC.Data.Entities
{
    public class Category : DomainEntity<int>
    {
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(128)]
        public string NormalizedName { get; set; }

        public string ImgUrl { get; set; }
    }
}