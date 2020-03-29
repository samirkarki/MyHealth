using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class CountriesController : BaseModelController<Country>
    {
        public CountriesController(CrudService<Country> countryService) : base(countryService){}
   }
}