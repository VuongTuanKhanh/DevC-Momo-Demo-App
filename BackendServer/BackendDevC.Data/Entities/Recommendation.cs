using BackendDevC.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDevC.Data.Entities
{
    public class Recommendation : DomainEntity<long>
    {
        public string UserId { get; set; }

        public string ServicesRecommend { get; set; }

        public string SpecialRecommend { get; set; }
    }
}
