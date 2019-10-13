using BackendDevC.API.ViewModels;
using BackendDevC.Data.Entities;
using BackendDevC.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDevC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        private readonly IRepository<Recommendation, long> _recomRepo;
        private readonly IRepository<Stores, string> _storeRepo;

        public RecommendationController(IRepository<Recommendation, long> recomRepo,
            IRepository<Stores, string> storeRepo)
        {
            _recomRepo = recomRepo;
            _storeRepo = storeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _recomRepo.Query().ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> GetByUserId([FromBody]FilterRecommend filter)
        {
            var recommendedForUser = await _recomRepo.Query().FirstOrDefaultAsync(x => x.UserId.Equals(filter.UserId));
            if(recommendedForUser == null)
            {
                // for new user
                recommendedForUser = await _recomRepo.Query().FirstOrDefaultAsync(x => x.UserId.Equals("0"));
            }
            List<RecommendedServices> res = JsonConvert.DeserializeObject<List<RecommendedServices>>(recommendedForUser.ServicesRecommend);
            var stores = _storeRepo.FindAll(x => x.Latitude.CompareTo(filter.LatMax) <= 0 &&
                               x.Latitude.CompareTo(filter.LatMin) >= 0 &&
                               x.Longitude.CompareTo(filter.LongMin) >= 0 &&
                               x.Longitude.CompareTo(filter.LongMax) <= 0);
            if (filter.Category != null)
            {
                stores = stores.Where(x => filter.Category.Contains(x.Category));
            }
            var returnStore = (from r in Enumerable.Reverse(res)
                               join s in stores
                               on r.ServiceId equals s.ServiceId
                               select new
                               {
                                   s.AvrAmount,
                                   s.StoreAddress,
                                   Lat = s.Latitude,
                                   Long = s.Longitude,
                                   s.StoreName,
                                   s.ImgUrl,
                                   
                               });
            returnStore = returnStore.Skip((filter.Page - 1) * filter.PageSize).Take(filter.PageSize).ToList();

            return Ok(returnStore);
        }

        [HttpGet("special")]
        public async Task<IActionResult> GetSpecialRecommend(string userId)
        {
            var recommendedForUser = await _recomRepo.Query().FirstOrDefaultAsync(x => x.UserId.Equals(userId));
            if(recommendedForUser == null)
            {
                recommendedForUser = await _recomRepo.Query().FirstOrDefaultAsync(x => x.UserId.Equals("0"));
            }
            List<SpecialRecommends> res = JsonConvert.DeserializeObject<List<SpecialRecommends>>(recommendedForUser.SpecialRecommend);
            var returnData = (from r in Enumerable.Reverse(res)
                              join s in _storeRepo.FindAll()
                              on new {x1 = r.ServiceId, x2 = r.StoreId} equals new { x1= s.ServiceId, x2 = s.StoreId}

                              select new {
                                  caption = s.StoreAddress,
                                  url = s.ImgUrl,
                                  type = r.Type,
                                  title = s.StoreName,
                                  avrAmount = s.AvrAmount,
                                  Lat = s.Latitude,
                                  Long = s.Longitude
                              });
            return Ok(returnData);
        }
    }
}