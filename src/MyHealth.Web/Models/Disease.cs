using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class Disease : BaseModel
    {
        public string Name { get; set; }
        public IList<Symptom> Symptoms {get;set;}
        
    }
}
