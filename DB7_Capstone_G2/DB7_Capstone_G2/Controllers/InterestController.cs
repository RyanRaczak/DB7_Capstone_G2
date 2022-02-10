using DB7_Capstone_G2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InterestController : ControllerBase
    {
        InterestDAL db = new InterestDAL();

        [HttpGet("all")]
        public List<Interest> GetInterests()
        {
            return db.GetInterests();
        }

        [HttpGet("byId/{id}")]
        public Interest GetInterest(int id)
        {
            if (db.ValidId(id))
            {
                return db.GetInterest(id);
            }
            else
            {
                Interest error = new Interest();
                error.InterestName = "Invalid Search Criteria";
                return error;
            }
        }

        [HttpPost("addInterest")]
        public void AddInterest(Interest newInterest)
        {
            if (!db.ValidId(newInterest.Id))
            {
                db.AddInterest(newInterest);
            }
        }

        [HttpDelete("removeInterest/{id}")]
        public void RemoveInterest(int id)
        {
            if (db.ValidId(id))
            {
                db.RemoveInterest(id);
            }
        }

        [HttpPut("editInterest/{id}")]
        public void EditInterest(int id, Interest modifiedInterest)
        {
            if (db.ValidId(id))
            {
                Interest oldInterest = db.GetInterest(id);
                if (modifiedInterest.InterestName == null || modifiedInterest.InterestName == "")
                {
                    modifiedInterest.InterestName = oldInterest.InterestName;
                }
                db.EditInterest(id, modifiedInterest);
            }
        }
    }
}
