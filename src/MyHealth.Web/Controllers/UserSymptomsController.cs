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
    
    }
}
