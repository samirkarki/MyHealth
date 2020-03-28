﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyHealth.Web.Models
{
    public class DiseaseSymptom : BaseModel
    {
        public string DiseaseId { get; set; }
        public string SymptomId { get; set; }
        public decimal Score { get; set; }
        
    }
}
