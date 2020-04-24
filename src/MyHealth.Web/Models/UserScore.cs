using System;

namespace MyHealth.Web.Models
{
    public class UserScore : BaseModel
    {
        public string DiseaseId { get; set; }
        public string DiseaseName { get; set; }
        public string UserId { get; set; }
        public decimal TotalScore { get; set; }
        public int TotalSymptomCount { get; set; }
        public decimal MajorScore { get; set; }
        public int MajorSymptomCount { get; set; }
        public string SafetyMeasures { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Rank { get; set; }
        public string IpAddress { get; set; }
    }
}
