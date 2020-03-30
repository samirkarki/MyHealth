using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class Symptom : BaseModel
    {
        public string Description { get; set; }
        public string Remarks { get; set; }
        public IEnumerable<SymptomDetail> SymptomDetails{get;set;}
    }
}
