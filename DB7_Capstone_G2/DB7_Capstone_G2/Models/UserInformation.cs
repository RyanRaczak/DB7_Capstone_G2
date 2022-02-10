using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class UserInformation
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserBio { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public List<Event> EventsAttending { get; set; }
    }
}
