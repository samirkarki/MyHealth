using System.Collections.Generic;
using MongoDB.Driver;
using MyHealth.Web.DbSettings;
using MyHealth.Web.Models;
using PluralizeService.Core;

namespace MyHealth.Web.Services
{
    public class CrudService<T> where T : BaseModel
    {
        private readonly IMongoCollection<T> _collection;

        public CrudService(IMyHealthDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _collection = database.GetCollection<T>(PluralizationProvider.Pluralize(nameof(T)));
        }

        public List<T> Get() =>
            _collection.Find(obj => true).ToList();

        public T Get(string id) =>
            _collection.Find<T>(book => book.Id == id).FirstOrDefault();

        public T Create(T book)
        {
            _collection.InsertOne(book);
            return book;
        }

        public void Update(string id, T bookIn) =>
            _collection.ReplaceOne(book => book.Id == id, bookIn);

        public void Remove(T bookIn) =>
            _collection.DeleteOne(book => book.Id == bookIn.Id);

        public void Remove(string id) => 
            _collection.DeleteOne(book => book.Id == id);
    }
}