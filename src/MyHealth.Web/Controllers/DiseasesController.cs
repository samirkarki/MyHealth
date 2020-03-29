using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class DiseasesController : BaseModelController<Disease>
    {
        private readonly CrudService<DiseaseSymptom> _diseaseSymptomService;

        public DiseasesController(CrudService<Disease> diseaseService, CrudService<DiseaseSymptom> diseaseSymptomService) : base(diseaseService){
            _diseaseSymptomService = diseaseSymptomService;
        }

        [HttpPost]
        [Route("{diseaseId}/symptoms")]
        public IActionResult AddSymptoms(string diseaseId, DiseaseSymptom[] diseaseSymptoms){
            foreach(var diseaseSymptom in diseaseSymptoms){
                _diseaseSymptomService.Create(diseaseSymptom);
            }
            return Ok();
        }

        [HttpPut]
        [Route("{diseaseId}/symptoms")]
        public IActionResult UpdateSymptoms(string diseaseId, DiseaseSymptom diseaseSymptom){
            _diseaseSymptomService.Update(diseaseSymptom.Id, diseaseSymptom);
            return Ok();
        }

        [HttpGet]
        [Route("{diseaseId}/symptoms")]
        public ActionResult<DiseaseSymptom> AddSymptoms(string diseaseId){
            var diseaseSymptoms = _diseaseSymptomService.Query(ds=>ds.DiseaseId==diseaseId);
            return Ok(diseaseSymptoms);
        }

   }
}