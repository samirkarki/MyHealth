using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class UserSymptom : BaseModel
    {
        public string UserId { get; set; }
        public string SymptomId { get; set; }
        public string SymptomDetailId { get; set; }
        public bool Selected {get;set;}
        
    }
}
