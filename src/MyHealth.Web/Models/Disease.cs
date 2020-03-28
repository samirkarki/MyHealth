using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class Disease : BaseModel
    {

        [BsonElement("Name")]
        public string Name { get; set; }
        
    }
}
