using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class UserSymptomsController : BaseModelController<UserSymptom>
    {
        public UserSymptomsController(CrudService<UserSymptom> userSymptomService) : base(userSymptomService){}
   }
}