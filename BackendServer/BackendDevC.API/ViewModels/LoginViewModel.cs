using System.ComponentModel.DataAnnotations;

namespace BackendDevC.API.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}