using Dapper;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class InterestDAL
    {
        string connection = Secret.Connection;

        public List<Interest> GetInterests()
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = "select * from interests";
                connect.Open();
                List<Interest> output = connect.Query<Interest>(sql).ToList();
                connect.Close();
                return output;
            }
        }

        public Interest GetInterest(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"select * from interests " +
                    $"where Id = {id}";
                connect.Open();
                Interest output = connect.Query<Interest>(sql).ToList().First();
                connect.Close();
                return output;
            }
        }

        public void AddInterest(Interest newInterest)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"insert into interests " +
                    $"values({0}, \"{newInterest.InterestName}\")";
                connect.Open();
                connect.Query<Interest>(sql);
                connect.Close();
            }
        }

        public void RemoveInterest(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"delete from interests " +
                    $"where Id={id}";
                connect.Open();
                connect.Query<Interest>(sql);
                connect.Close();
            }
        }

        public void EditInterest(int id, Interest modifiedInterest)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"update interests " +
                    $"set InterestName = \"{modifiedInterest.InterestName}\" " +
                    $"where Id = {id}";
                connect.Open();
                connect.Query<Interest>(sql);
                connect.Close();
            }
        }

        public bool ValidId(int id)
        {
            List<Interest> interests = GetInterests();
            foreach (var item in interests)
            {
                if (item.Id == id)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
