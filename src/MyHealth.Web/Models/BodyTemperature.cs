using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class BodyTemparature : BaseModel
    {
        public string Description { get; set; }
        public string Remarks { get; set; }
        
    }
}
