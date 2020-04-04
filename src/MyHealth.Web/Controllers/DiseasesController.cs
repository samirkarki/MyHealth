using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;
using System.Linq;

namespace MyHealth.Web.Controllers
{
    [Authorize]
    public class DiseasesController : BaseModelController<Disease>
    {
        private readonly CrudService<DiseaseSymptom> _diseaseSymptomService;
        private readonly QuestionnaireService _questionnaireService;

        public DiseasesController(CrudService<Disease> diseaseService, CrudService<DiseaseSymptom> diseaseSymptomService, QuestionnaireService questionnaireService) : base(diseaseService)
        {
            _diseaseSymptomService = diseaseSymptomService;
            _questionnaireService = questionnaireService;
        }

        [HttpPost]
        [Route("{diseaseId}/symptoms")]
        public IActionResult AddSymptoms(string diseaseId, DiseaseSymptom[] diseaseSymptoms)
        {
            foreach (var diseaseSymptom in diseaseSymptoms)
            {

                var symptomDetails = _diseaseSymptomService.Query(s => s.SymptomId == diseaseSymptom.SymptomId
                && s.DiseaseId == diseaseSymptom.DiseaseId && s.SymptomDetailId == diseaseSymptom.SymptomDetailId).ToArray();

                if (symptomDetails.Length > 0)
                {
                    diseaseSymptom.Id = symptomDetails[0].Id;
                    _diseaseSymptomService.Update(symptomDetails[0].Id, diseaseSymptom);
                }
                else
                {
                    _diseaseSymptomService.Create(diseaseSymptom);
                }
            }
            var result = new
            {
                Data = "Symptoms data updated successfully.",
                Status = true
            };
            return Ok(result);


        }

        [HttpPut]
        [Route("{diseaseId}/symptoms")]
        public IActionResult UpdateSymptoms(string diseaseId, DiseaseSymptom diseaseSymptom)
        {
            _diseaseSymptomService.Update(diseaseSymptom.Id, diseaseSymptom);
            return Ok();
        }

        [HttpGet]
        [Route("{diseaseId}/symptoms")]
        public ActionResult<DiseaseSymptom> AddSymptoms(string diseaseId)
        {
            var diseaseSymptoms = _diseaseSymptomService.Query(ds => ds.DiseaseId == diseaseId);
            return Ok(diseaseSymptoms);
        }

        [HttpGet]
        [Route("{diseaseId}/symptoms/details")]
        public ActionResult<Disease> GetSymptomDetails(string diseaseId)
        {
            var diseaseSymptoms = _questionnaireService.GetDiseaseSymptoms(diseaseId);
            return Ok(diseaseSymptoms);
        }

        [HttpPost]
        [Route("{diseaseId}/symptoms/add")]
        public ActionResult<Disease> GetSymptomDetailAdd(string diseaseId, DiseaseSymptom symptom)
        {
            var diseaseSymptoms = _questionnaireService.GetDiseaseSymptomsToAdd(diseaseId, symptom.SymptomId);
            return Ok(diseaseSymptoms);
        }

        [HttpPost]
        [Route("{diseaseId}/symptoms/details")]
        public ActionResult<SymptomDetail> DeleteDetails(string diseaseId, DiseaseSymptom symptom)
        {

            var symptomDetails = _diseaseSymptomService.Query(s => s.DiseaseId == diseaseId && s.SymptomId == symptom.SymptomId).ToList();
            if (symptomDetails.Count > 0)
            {
                foreach (var item in symptomDetails)
                {
                    _diseaseSymptomService.Remove(item);
                }

                var result = new
                {
                    Data = "Symptom details deleted successfully.",
                    Status = true
                };
                return Ok(result);
            }
            else
            {


                var result = new
                {
                    Data = "Data not found",
                    Status = false
                };
                return Ok(result);
            }

        }

        [HttpPost]
        [Route("{diseaseId}/symptoms/setmajor")]
        public ActionResult<SymptomDetail> SetMajorSymptom(string diseaseId, Symptom symptom)
        {

            var symptomDetails = _diseaseSymptomService.Query(s => s.DiseaseId == diseaseId).ToList();

            if (symptomDetails.Count > 0)
            {
                foreach (var item in symptomDetails)
                {
                    item.IsMajorSymptom = false;
                    if (item.SymptomId == symptom.Id)
                        item.IsMajorSymptom = true;
                    _diseaseSymptomService.Update(item.Id, item);
                }

                var result = new
                {
                    Data = "Symptom updated successfully.",
                    Status = true
                };
                return Ok(result);
            }
            else
            {


                var result = new
                {
                    Data = "Data not found",
                    Status = false
                };
                return Ok(result);
            }

        }

    }



}