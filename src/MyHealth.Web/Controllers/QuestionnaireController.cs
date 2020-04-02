using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    [Authorize]
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
        public ActionResult<IEnumerable<UserScore>> Post(IList<UserSymptom> userSymptoms)
        {
            var userScores = _questionnaireService.SaveQuestionnaire(userSymptoms);
            return Ok(userScores);
        }

   }
}
