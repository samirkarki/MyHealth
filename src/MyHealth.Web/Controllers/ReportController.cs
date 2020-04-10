using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Controllers;
using MyHealth.Web.Models;
using MyHealth.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHealth.Web
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly CrudService<UserScore> _userScoreService;
        public ReportController(CrudService<UserScore> userScoreService)
        {
            _userScoreService = userScoreService;
        }

        [HttpPost]
        [Route("/report/suspected")]
        public ActionResult<ReportDTO> DeleteDetails(ReportFilter filter)
        {
            var result = _userScoreService.Query(us => us.DiseaseId == filter.DiseaseId).ToList();

            List<ReportDTO> _result = result.GroupBy(l => l.CreatedDate.ToString("yyyy/MM/dd")).Select(cl => new ReportDTO
            {
                x = cl.Key,
                y = cl.Count().ToString()
            }).ToList();
            
            return Ok(_result);

        }


    }
}
