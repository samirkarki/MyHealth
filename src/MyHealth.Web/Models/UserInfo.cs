using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class UserInfo : BaseModel
    {
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string ContactNumber { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string Token { get; set; }
        public string Gender { get; set; }
        public bool IsAdmin { get; set; }
        public string ImageUrl { get; set; }
        public string Role => IsAdmin ? "Admin" : "Guest";
        public bool IsDeleted { get; set; }
        public IEnumerable<Symptom> Symptoms{get;set;}
    }
}
