namespace Sabio.Models.Domain
{
    public class Address
    {
        // 	for data comming in from the data base

        public int Id { get; set; }

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
