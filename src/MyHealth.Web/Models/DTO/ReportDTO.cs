using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHealth.Web.Models
{
    public class ReportDTO
    {
        public string x { get; set; }
        public string y { get; set; }
    }

    public class ReportFilter
    {
        public string DiseaseId { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
    }
}
