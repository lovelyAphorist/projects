using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class SubscriberAddRequest
    {
       // public int Id { get; set; }
        public string Email { get; set; }
        public string StripeCustomerId { get; set; }
        public int SubscriptionType { get; set; }
        public int UserId { get; set; }

    }
}
