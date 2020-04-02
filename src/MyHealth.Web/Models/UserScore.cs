namespace MyHealth.Web.Models
{
    public class UserScore : BaseModel
    {
        public string DiseaseId { get; set; }
        public string DiseaseName { get; set; }
        public string UserId { get; set; }
        public string TotalScore { get; set; }
        public string MajorScore { get; set; }
        public int MajorSymptomCount { get; set; }
    }
}