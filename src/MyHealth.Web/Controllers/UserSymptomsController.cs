using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class UserSymptomsController : BaseModelController<UserSymptom>
    {
        CrudService<Symptom> _symptomService;
        CrudService<SymptomDetail> _symptomDetailService;

        public UserSymptomsController(CrudService<UserSymptom> userSymptomService,  CrudService<Symptom> symptomService, CrudService<SymptomDetail> symptomDetailService) : base(userSymptomService){
            _symptomService = symptomService;
            _symptomDetailService = symptomDetailService;
        }
    

        [HttpGet]
        [Route("~/api/questionnaire/{userId}")]
        public ActionResult<IEnumerable<UserInfo>> Questionnaire(string userId)
        {
            var userInfo = new UserInfo{Id=userId, Symptoms = new List<Symptom>()};
            
            var userSymptoms = _crudService.Query(u=>u.UserId==userId);
            foreach(var symptomId in userSymptoms.Select(s=>s.SymptomId).Distinct()){
                var symptom = userInfo.Symptoms.FirstOrDefault(s=>s.Id==symptomId);
                if(symptom == null)
                {
                    symptom = _symptomService.Query(s=>s.Id==symptomId).First();
                    symptom.SymptomDetails = _symptomDetailService.Query(s=>s.SymptomId==symptomId);
                    userInfo.Symptoms.Add(symptom);
                } 
            }
            return Ok(userInfo);
        }
    }
}