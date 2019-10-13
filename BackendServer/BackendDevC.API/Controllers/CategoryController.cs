using BackendDevC.Data.Entities;
using BackendDevC.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDevC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IRepository<Category, int> _cateRepo;

        public CategoryController(IRepository<Category, int> cateRepo)
        {
            _cateRepo = cateRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cates = await _cateRepo.Query().Select(x => new {
                x.Name,
                x.NormalizedName,
                x.ImgUrl
            }).ToListAsync();
            return Ok(cates);
        }
    }
}