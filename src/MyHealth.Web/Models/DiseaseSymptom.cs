using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class DiseaseSymptom
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string DiseaseId { get; set; }
        public string SymptomId { get; set; }
        public decimal Score { get; set; }
        
    }
}
