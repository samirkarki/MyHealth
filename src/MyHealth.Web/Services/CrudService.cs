using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using MyHealth.Web.DbSettings;
using MyHealth.Web.Models;
using PluralizeService.Core;
using System;
using System.Linq.Expressions;
using MongoDB.Bson.Serialization;

namespace MyHealth.Web.Services
{
    public class CrudService<T> where T : BaseModel
    {
        private readonly IMongoCollection<T> _collection;
        public CrudService(IMyHealthDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _collection = database.GetCollection<T>(PluralizationProvider.Pluralize(typeof(T).Name));
        }

        public List<T> Get() =>
            _collection.Find(obj => true).ToList();

        public T Get(string id) =>
            _collection.Find<T>(item => item.Id == id).FirstOrDefault();

        public T Create(T item)
        {
            _collection.InsertOne(item);
            return item;
        }

        public void Update(string id, T itemIn) =>
            _collection.ReplaceOne(item => item.Id == id, itemIn);

        public void Remove(T itemIn) =>
            _collection.DeleteOne(item => item.Id == itemIn.Id);

        public void Remove(string id) => 
            _collection.DeleteOne(item => item.Id == id);

        public IEnumerable<T> Query()
        {
            return _collection.Find(FilterDefinition<T>.Empty).ToList();
        }
        public IEnumerable<T> Query(Expression<Func<T, bool>> filter)
        {
            return _collection.Find(filter).ToList();
        }

        public IEnumerable<T> Query(string filter)
        {
            return _collection.Find(filter).ToList();
        }
    }
}