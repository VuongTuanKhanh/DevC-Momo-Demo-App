using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDevC.API.ViewModels
{
    public class FilterRecommend
    {
        public double LatMin { get; set; }

        public double LatMax { get; set; }

        public double LongMax { get; set; }

        public double LongMin { get; set; }

        public string[] Category { get; set; }

        public string UserId { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }
    }
}
