using System.Collections.Generic;

namespace MyHealth.Web.Models
{
    public class Questionnaire
    {
        public string UserId{get;set;}
        public int Age{get;set;}
        public string ContactNumber{get;set;}
        public IList<UserSymptom> UserSymptoms{get;set;}
    }
}