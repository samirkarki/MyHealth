using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHealth.Web.Models;
using MyHealth.Web.Services;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;

namespace MyHealth.Web.Controllers
{
    [Authorize]
    public class SymptomsController : BaseModelController<Symptom>
    {
        private readonly CrudService<SymptomDetail> _symptomDetailService;
        public SymptomsController(CrudService<Symptom> symptomService, CrudService<SymptomDetail> symptomDetailService) : base(symptomService)
        {
            _symptomDetailService = symptomDetailService;
        }

        [HttpGet]
        [Route("{symptomsId}/details")]
        public ActionResult<SymptomDetail> GetDetails(string symptomsId)
        {
            var symptomDetails = _symptomDetailService.Query(s => s.SymptomId == symptomsId);
            return Ok(symptomDetails);
        }

        // [HttpPost]
        // [Route("{symptomsId}/details")]
        // public ActionResult<SymptomDetail> AddDetails(SymptomDetail detail)
        // {

        //     var symptomDetail = _symptomDetailService.Get(detail.Id);
        //     if (symptomDetail != null)
        //     {
        //             _symptomDetailService.Update(detail.Id, detail);
        //             var result = new
        //             {
        //                 Data = "Symptom details updated successfully.",
        //                 Status = true
        //             };
        //             return Ok(result);
        //     }
        //     else
        //     {

        //         _symptomDetailService.Create(detail);
        //         var result = new
        //         {
        //             Data = "Symptom details added successfully.",
        //             Status = true
        //         };
        //         return Ok(result);
        //     }

        // }

        [HttpDelete]
        [Route("{symptomsId}/details")]
        public ActionResult<SymptomDetail> DeleteDetails(string symptomsId)
        {

            var symptomDetails = _symptomDetailService.Query(s => s.Id == symptomsId).ToList();
            if (symptomDetails.Count > 0)
            {
                _symptomDetailService.Remove(symptomDetails[0]);
                var result = new
                {
                    Data = "Symptom details deleted successfully.",
                    Status = true
                };
                return Ok(result);
            }
            else
            {


                var result = new
                {
                    Data = "Data not found",
                    Status = false
                };
                return Ok(result);
            }

        }

    }
}