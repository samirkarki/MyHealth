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
        [Route("{userId}/questionnaire")]
        public ActionResult<IEnumerable<UserSymptom>> Questionnaire(string userId)
        {
            var userSymptoms = _crudService.Query(u=>u.UserId==userId);
            foreach(var userSymptom in userSymptoms){
                if(userSymptom.Symptoms==null){
                    userSymptom.Symptoms = new List<Symptom>();
                }
                var symptom = userSymptom.Symptoms.FirstOrDefault(s=>s.Id==userSymptom.SymptomId);
                if(symptom == null)
                {
                    symptom = _symptomService.Query(s=>s.Id==userSymptom.SymptomId).First();
                    symptom.SymptomDetails = _symptomDetailService.Query(s=>s.SymptomId==userSymptom.SymptomId);
                    userSymptom.Symptoms.Add(symptom);
                } 
            }
            return Ok(userSymptoms);
        }
    }
}