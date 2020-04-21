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
        private readonly CrudService<UserSymptom> _userSymptomService;
        private readonly CrudService<UserScore> _userScoreService;

        public CrudService<UserInfo> _userInfoService;

        public QuestionnaireService(
            IOptions<AppSettings> appSettings,
            CrudService<UserInfo> userInfoService,
            CrudService<Disease> diseaseService,
            CrudService<Symptom> symptomService,
            CrudService<SymptomDetail> symptomDetailService,
             CrudService<DiseaseSymptom> diseaseSymptomService,
             CrudService<UserSymptom> userSymptomService,
             CrudService<UserScore> userScoreService
             )
        {
            _appSettings = appSettings.Value;
            _userInfoService = userInfoService;
            _diseaseService = diseaseService;
            _symptomService = symptomService;
            _symptomDetailService = symptomDetailService;
            _diseaseSymptomService = diseaseSymptomService;
            _userSymptomService = userSymptomService;
            _userScoreService = userScoreService;
        }

        public IEnumerable<Symptom> GetSymptoms()
        {
            var diseaseIds = GetActiveDiseases().Select(d => d.Id);
            var symptomIds = _diseaseSymptomService.Query(ds => diseaseIds.Contains(ds.DiseaseId)).Select(ds => ds.SymptomId).Distinct();
            var symptoms = _symptomService.Query(s => symptomIds.Contains(s.Id));
            foreach (var symptom in symptoms)
            {
                symptom.SymptomDetails = _symptomDetailService.Query(s => s.SymptomId == symptom.Id);
            }
            return symptoms;
        }

        private IEnumerable<Disease> GetActiveDiseases()
        {
            return _diseaseService.Query(d => d.Selected);
        }

        public IEnumerable<UserScore> SaveQuestionnaire(Questionnaire questionnaire){
            if(questionnaire.UserId.ToLower().StartsWith("anonymous-")){
                var user = new UserInfo();
                user.UserName=questionnaire.UserId;
                user.Age=questionnaire.Age;
                user.Gender=questionnaire.Gender;
                user.ContactNumber = questionnaire.ContactNumber;
                _userInfoService.Create(user);
            }
            else{
                var user = _userInfoService.Get(questionnaire.UserId);
                if(user!=null){
                    user.Age=questionnaire.Age;
                    user.Gender=questionnaire.Gender;
                    user.ContactNumber = questionnaire.ContactNumber;
                    _userInfoService.Update(user.Id, user);
                }
            }
            _userSymptomService.CreateMany(questionnaire.UserSymptoms);
            var userScores = new List<UserScore>();
            bool hasSomeDisease = false;
            foreach(var disease in GetActiveDiseases()){
                var userScore = new UserScore();
                userScore.DiseaseId = disease.Id;
                userScore.DiseaseName = disease.Name;
                userScore.SafetyMeasures = disease.SafetyMeasures;
                userScore.UserId = questionnaire.UserId;
                var diseaseSymptoms = _diseaseSymptomService.Query(ds => ds.DiseaseId==disease.Id);
                foreach(var diseaseSymptom in diseaseSymptoms){
                    var selectedSymptomDetail = questionnaire.UserSymptoms.FirstOrDefault(us=>us.SymptomDetailId==diseaseSymptom.SymptomDetailId && us.Selected);
                    if(selectedSymptomDetail !=null){
                        userScore.TotalSymptomCount+=1;
                        userScore.TotalScore+=userScore.TotalScore;
                        userScore.TotalScore+=diseaseSymptom.Score;
                        if(diseaseSymptom.IsMajorSymptom){
                            userScore.MajorSymptomCount += 1;
                            userScore.MajorScore+=diseaseSymptom.Score;
                        }
                    }
                }
                if(userScore.TotalSymptomCount>0)
                    userScore.TotalScore = userScore.TotalScore/userScore.TotalSymptomCount;
                if(userScore.MajorSymptomCount>0){
                    userScore.MajorScore = userScore.MajorScore/userScore.MajorSymptomCount;
                    if(!hasSomeDisease)
                        hasSomeDisease = (userScore.MajorScore >= 0.5M);
                }
                userScore.CreatedDate = DateTime.Today;
                userScores.Add(userScore);
                _userScoreService.Remove(us=>us.UserId==userScore.UserId && us.DiseaseId==userScore.DiseaseId);
            }
            if(!hasSomeDisease){
                userScores.Add(new UserScore{UserId=questionnaire.UserId, DiseaseId="None", DiseaseName="No Disease suspected", SafetyMeasures="", TotalScore=1, MajorScore=1, TotalSymptomCount=1, MajorSymptomCount=1});
            }
            userScores = userScores.OrderByDescending(n => n.MajorScore).Select((n, i) => {n.Rank=i+1;return n;}).ToList();
            _userScoreService.CreateMany(userScores);
            return userScores;
        }

        public IEnumerable<UserScore> GetResult(string userId){
            return _userScoreService.Query(us=>us.UserId==userId);
        }

        public Disease GetDiseaseSymptoms(string diseaseId)
        {
            var disease = _diseaseService.Get(diseaseId);
            var symptomIds = _diseaseSymptomService.Query(ds => ds.DiseaseId == diseaseId).Select(ds => ds.SymptomId).Distinct();
            disease.Symptoms = _symptomService.Query(s => symptomIds.Contains(s.Id));
            foreach (var symptom in disease.Symptoms)
            {
                symptom.SymptomDetails = _symptomDetailService.Query(s => s.SymptomId == symptom.Id);
                foreach (SymptomDetail detail in symptom.SymptomDetails)
                {
                    var symp = _diseaseSymptomService.Query(ds => ds.DiseaseId == diseaseId && ds.SymptomId == detail.SymptomId && ds.SymptomDetailId == detail.Id).ToList();
                    if (symp.Count > 0)
                    {
                        symptom.IsMajorSymptom = symp[0].IsMajorSymptom;
                    }


                }
            }
            return disease;
        }

        public Disease GetDiseaseSymptomsToAdd(string diseaseId, string symptomID)
        {
            var disease = _diseaseService.Get(diseaseId);
            var symptomIds = new List<string>();
            if (symptomID.Length == 0)
            {
                symptomIds = _diseaseSymptomService.Query(ds => ds.DiseaseId == diseaseId).Select(ds => ds.SymptomId).Distinct().ToList();
                disease.Symptoms = _symptomService.Query(s => !symptomIds.Contains(s.Id));
            }
            else
            {
                symptomIds = _diseaseSymptomService.Query(ds => ds.DiseaseId == diseaseId && ds.SymptomId == symptomID).Select(ds => ds.SymptomId).Distinct().ToList();
                disease.Symptoms = _symptomService.Query(s => symptomIds.Contains(s.Id));
            }
            foreach (var symptom in disease.Symptoms)
            {
                if (symptomID.Length == 0)
                    symptom.SymptomDetails = _symptomDetailService.Query(s => s.SymptomId == symptom.Id);
                else
                    symptom.SymptomDetails = _symptomDetailService.Query(s => s.SymptomId == symptomID);


                foreach (SymptomDetail detail in symptom.SymptomDetails)
                {
                    var symp = _diseaseSymptomService.Query(ds => ds.DiseaseId == diseaseId && ds.SymptomId == symptomID && ds.SymptomDetailId == detail.Id).ToList();
                    if (symp.Count > 0)
                    {
                        detail.Score = symp[0].Score;
                    }


                }
            }




            return disease;
        }

    }
}
