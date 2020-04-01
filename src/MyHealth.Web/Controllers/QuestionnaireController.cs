using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class QuestionnaireController: MyHealthController
    {
        private readonly QuestionnaireService _questionnaireService;

        public QuestionnaireController(QuestionnaireService questionnaireService)
        {
            _questionnaireService = questionnaireService;
        }

        [HttpGet]
        [Route("{userId}")]
        public ActionResult<UserInfo> Get(string userId)
        {
            var userSymptoms = _questionnaireService.GetSymptoms();
            var userInfo = new UserInfo{Id=userId, Symptoms = userSymptoms};
            return userInfo;
        }

        [HttpPost]
        [Route("{userId}")]
        public ActionResult<UserInfo> Post(string userId)
        {
            var userSymptoms = _questionnaireService.GetSymptoms();
            var userInfo = new UserInfo{Id=userId, Symptoms = userSymptoms};
            return userInfo;
        }

   }
}
