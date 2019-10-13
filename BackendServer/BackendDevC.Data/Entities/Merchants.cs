using BackendDevC.Infrastructure.Models;

namespace BackendDevC.Data.Entities
{
    public class Stores : DomainEntity<string>
    {
        public string StoreName { get; set; }
        public string StoreAddress { get; set; }

        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string MechantName { get; set; }
        public string MerchantAddress { get; set; }
        public string ServiceId { get; set; }

        public string StoreId { get; set; }

        public string Category { get; set; }
        public string ImgUrl { get; set; }

        public int AvrAmount { get; set; }
    }
}