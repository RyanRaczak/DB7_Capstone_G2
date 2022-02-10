using Dapper;
using MySqlConnector;
using System.Collections.Generic;
using System.Linq;

namespace DB7_Capstone_G2.Models
{
    public class CityDAL
    {
        string connection = Secret.Connection;

        public List<City> GetCities()
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = "select * from cities";
                connect.Open();
                List<City> output = connect.Query<City>(sql).ToList();
                connect.Close();
                return output;
            }
        }

        public City GetCity(string cName, string sAbbr)
        {
            List<City> cities = GetCities();
            City output = cities.Where(c => c.CityName.Trim().ToLower() == cName.Trim().ToLower() 
                                        && c.StateAbbr.Trim().ToLower() == sAbbr.Trim().ToLower()).ToList().First();
            return output;
        }

        public bool ValidId(string cName, string abbr)
        {
            List<City> cities = GetCities();
            foreach (var city in cities)
            {
                if (city.StateAbbr.Trim().ToLower() == abbr.Trim().ToLower() 
                    && city.CityName.Trim().ToLower() == cName.Trim().ToLower())
                {
                    return true;
                }
            }
            return false;
        }
    }
}