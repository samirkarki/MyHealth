using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    [Authorize]
    public class SymptomsController : BaseModelController<Symptom>
    {
        public SymptomsController(CrudService<Symptom> symptomService) : base(symptomService){}

   }
}