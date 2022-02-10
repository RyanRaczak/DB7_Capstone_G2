using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class City
    {
        [Key]
        public string StateAbbr { get; set; }
        public string CityName { get; set; }
    }
}
