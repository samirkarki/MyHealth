using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class SymptomDetailsController : BaseModelController<SymptomDetail>
    {
        public SymptomDetailsController(CrudService<SymptomDetail> symptomDetailService) : base(symptomDetailService){}

   }
}