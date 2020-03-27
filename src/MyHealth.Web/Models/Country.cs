using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class Country : BaseModel
    {
        public string Name { get; set; }
        
    }
}
