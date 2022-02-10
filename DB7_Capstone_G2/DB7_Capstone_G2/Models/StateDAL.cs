using Dapper;
using MySqlConnector;
using System.Collections.Generic;
using System.Linq;

namespace DB7_Capstone_G2.Models
{
    public class StateDAL
    {
        string connection = Secret.Connection;

        public List<State> GetStates()
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = "select * from States";
                connect.Open();
                List<State> output = connect.Query<State>(sql).ToList();
                connect.Close();
                return output;
            }
        }

        public State GetState(string sAbbr)
        {
            List<State> states = GetStates();
            State output = states.Where(s => s.StateAbbr.Trim().ToLower() == sAbbr.Trim().ToLower()).ToList().First();
            return output;
        }

        public bool ValidId(string abbr)
        {
            List<State> states = GetStates();
            foreach (var item in states)
            {
                if (item.StateAbbr.Trim().ToLower() == abbr.Trim().ToLower())
                {
                    return true;
                }
            }
            return false;
        }
    }
}
