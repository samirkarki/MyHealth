using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class BodyTemperatureController : BaseModelController<BodyTemperature>
    {
        public BodyTemperatureController(CrudService<BodyTemperature> bodyTemperatureService) : base(bodyTemperatureService){}
   }
}