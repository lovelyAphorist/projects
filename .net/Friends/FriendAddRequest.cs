using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class FriendAddRequest
    {
        [Required]
        public string title { get; set; }

        [Required]
        public string bio { get; set; }

        [Required]
        public string summary { get; set; }

        [Required]
        public string headline { get; set; }

        [Required]
        public string slug { get; set; }

        [Required]
        public string statusId { get; set; }

 


    }
}
