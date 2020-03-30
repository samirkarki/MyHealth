using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyHealth.Web.Models;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public abstract class BaseModelController<T> : MyHealthController where T:BaseModel
    {
        protected readonly CrudService<T> _crudService;

        public BaseModelController(CrudService<T> crudService)
        {
            _crudService = crudService;
        }

        [HttpGet]
        [Route("")]
         public List<T> Get() =>
            _crudService.Get();

        [HttpGet]
        [Route("{id}")]
        public ActionResult<T> Get(string id)
        {
            return GetModel(id);
        }

        private ActionResult<T> GetModel(string id)
        {
            var model = _crudService.Get(id);

            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        [HttpPost]
        [Route("")]
        public ActionResult<T> Post(T model)
        {
            return _crudService.Create(model);
        }

        [HttpPost]
        [Route("multiple")]
        public ActionResult<IList<T>> PostArray(IList<T> models)
        {
            return Ok(_crudService.CreateMany(models));
        }

        
        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(string id, T modelIn)
        {
            var model = _crudService.Get(id);

            if (model == null)
            {
                return NotFound();
            }

            _crudService.Update(id, modelIn);

            return NoContent();
        }

        
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(string id)
        {
            var model = _crudService.Get(id);

            if (model == null)
            {
                return NotFound();
            }

            _crudService.Remove(model.Id);

            return NoContent();
        }
    }
}
