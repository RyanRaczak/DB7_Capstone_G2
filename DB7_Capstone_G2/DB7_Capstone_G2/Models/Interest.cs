using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class Interest
    {
        [Key]
        public int Id { get; set; }
        public string InterestName { get; set; }
    }
}
