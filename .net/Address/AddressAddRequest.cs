using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Address
{
    public class AddressAddRequest
    {

        public string LineOne { get; set; }

        public int SuiteNumber { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string PostalCode { get; set; }

        public bool IsActive { get; set; }

        public double Lat { get; set; }

        public double Long { get; set; }
    }
}
