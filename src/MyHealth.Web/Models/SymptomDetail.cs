using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class SymptomDetail : BaseModel
    {
        public string SymptomId { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public decimal Score { get; set; }
        public bool IsMajorSymptom { get; set; }
    }
}
