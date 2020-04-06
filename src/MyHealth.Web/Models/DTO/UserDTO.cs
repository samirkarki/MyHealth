namespace MyHealth.Web.Models
{
    public class UserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string UserId { get; set; }
        public bool IsAdmin { get; set; }
        public string Token { get; set; }
    }
}