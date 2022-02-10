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
    public class StateController : ControllerBase
    {
        StateDAL db = new StateDAL();

        [HttpGet("all")]
        public List<State> GetStates()
        {
            return db.GetStates();
        }

        [HttpGet("byId/{abbr}")]
        public State GetState(string abbr)
        {
            if (db.ValidId(abbr))
            {
                return db.GetState(abbr);
            }
            else
            {
                State error = new State();
                error.StateName = "Invalid Search Criteria";
                return error;
            }
        }
    }
}
