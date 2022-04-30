using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Friends
    {
        public int Id { get; set; }
        public string title { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime DateModified { get; set; }

        public string bio { get; set; }

        public string summary { get; set; }

        public string headline { get; set; }

        public string slug { get; set; }

        public string statusId { get; set; }

        public string Url { get; set; }

        public List<Skill> Skills { get; set; }
    }

    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
