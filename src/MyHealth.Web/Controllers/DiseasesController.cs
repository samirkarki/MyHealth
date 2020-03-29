using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class DiseasesController : MyHealthController
    {
        private readonly CrudService<Disease> _diseaseService;

        public DiseasesController(CrudService<Disease> diseaseService)
        {
            _diseaseService = diseaseService;
        }

        [HttpGet]
        public List<Disease> Get() =>
            _diseaseService.Get();

        [HttpGet("{id:length(24)}")]
        public ActionResult<Disease> Get(string id)
        {
            return GetDisease(id);
        }

        private ActionResult<Disease> GetDisease(string id)
        {
            var disease = _diseaseService.Get(id);

            if (disease == null)
            {
                return NotFound();
            }

            return disease;
        }

        [HttpPost]
        public ActionResult<Disease> Create(Disease disease)
        {
            return _diseaseService.Create(disease);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Disease diseaseIn)
        {
            var disease = _diseaseService.Get(id);

            if (disease == null)
            {
                return NotFound();
            }

            _diseaseService.Update(id, diseaseIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var disease = _diseaseService.Get(id);

            if (disease == null)
            {
                return NotFound();
            }

            _diseaseService.Remove(disease.Id);

            return NoContent();
        }
    }
}