using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class BodyTemperature : BaseModel
    {
        public string Description { get; set; }
        public string Remarks { get; set; }
        
    }
}
