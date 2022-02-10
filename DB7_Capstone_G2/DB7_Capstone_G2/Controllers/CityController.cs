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
    public class CityController : ControllerBase
    {
        CityDAL db = new CityDAL();

        [HttpGet("all")]
        public List<City> GetCities()
        {
            return db.GetCities();
        }

        [HttpGet("byId/city={cName}-state={sAbbr}")]
        public City GetCity(string cName, string sAbbr)
        {
            if (db.ValidId(cName,sAbbr))
            {
                return db.GetCity(cName, sAbbr);
            }
            else
            {
                City error = new City();
                error.CityName = "Invalid search criteria";
                return error;
            }
        }


    }
}
