namespace MyHealth.Web.DbSettings
{
    public class MyHealthDbSettings : IMyHealthDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IMyHealthDbSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}