using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyHealth.Web.Helpers;
using MyHealth.Web.Models;

namespace MyHealth.Web.Services
{

    public interface IQuestionnaireService
    {
        IEnumerable<Symptom> GetSymptoms();
        
    }


    public class QuestionnaireService : IQuestionnaireService
    {
        private readonly AppSettings _appSettings;
        private readonly CrudService<Disease> _diseaseService;
        private readonly CrudService<Symptom> _symptomService;
        private readonly CrudService<SymptomDetail> _symptomDetailService;
        private readonly CrudService<DiseaseSymptom> _diseaseSymptomService;
        public QuestionnaireService(
            IOptions<AppSettings> appSettings,
            CrudService<Disease> diseaseService,
            CrudService<Symptom> symptomService,
            CrudService<SymptomDetail> symptomDetailService,
             CrudService<DiseaseSymptom> diseaseSymptomService
             )
        {
            _appSettings = appSettings.Value;
            _diseaseService = diseaseService;
            _symptomService = symptomService;
            _symptomDetailService = symptomDetailService;
            _diseaseSymptomService = diseaseSymptomService;
        }

        public IEnumerable<Symptom> GetSymptoms(){
            var activeDiseases = _appSettings.ActiveDiseases.Split(',');
            var diseaseIds = _diseaseService.Query(d=>activeDiseases.Contains(d.Name)).Select(d=>d.Id);
            var symptomIds = _diseaseSymptomService.Query(ds=>diseaseIds.Contains(ds.DiseaseId)).Select(ds=>ds.SymptomId);
            var symptoms = _symptomService.Query(s=>symptomIds.Contains(s.Id));
            foreach(var symptom in symptoms)
            {
                symptom.SymptomDetails = _symptomDetailService.Query(s=>s.SymptomId==symptom.Id);
            }
            return symptoms;
        }

    }
}
