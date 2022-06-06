using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Subscribers
{
    public class Subscriber
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string StripeCustomerId { get; set; }
        public string SubscriptionType { get; set; }
        public DateTime SubscriptionEnd { get; set; }

    }
}
