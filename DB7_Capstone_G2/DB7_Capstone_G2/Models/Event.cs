using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }
        public int CreatedBy { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public DateTime EventDate { get; set; }
        public int EventCapacity { get; set; }
        public string EventCity { get; set; }
        public string EventState { get; set; }
        public List<UserInformation> Attendees { get; set; }
    }
}
