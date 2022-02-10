using Dapper;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class UserInformationDAL
    {
        string connection = Secret.Connection;

        public List<UserInformation> GetUserInformations()
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = "select * from UserInformation";
                connect.Open();
                List<UserInformation> output = connect.Query<UserInformation>(sql).ToList();
                foreach (var item in output)
                {
                    string sqlEvents = $"call nova.GetUserEvents({item.UserId})";
                    item.EventsAttending = connect.Query<Event>(sqlEvents).ToList();
                }
                connect.Close();
                return output;
            }
        }

        public UserInformation GetUserInformation(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"select * from UserInformation " +
                    $"where Id = {id}";
                string sqlEvents = $"call nova.GetUserEvents({id})";
                connect.Open();
                UserInformation output = connect.Query<UserInformation>(sql).ToList().First();
                output.EventsAttending = connect.Query<Event>(sqlEvents).ToList();
                connect.Close();
                return output;
            }
        }

        public UserInformation GetUserInformationByUserId(int userId)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"select * from UserInformation " +
                    $"where UserId = {userId}";
                //string sqlEvents = $"call nova.GetUserEvents({userId})";
                connect.Open();
                UserInformation output = connect.Query<UserInformation>(sql).ToList().First();
                string sqlEvents = $"call nova.GetUserEvents({output.UserId})";
                output.EventsAttending = connect.Query<Event>(sqlEvents).ToList();
                //output.EventsAttending = connect.Query<Event>(sqlEvents).ToList();
                connect.Close();
                return output;
            }
        }

        public void AddUserInformation(UserInformation newUserInformation)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"insert into userinformation " +
                    $"values({0}, {newUserInformation.UserId}, \"{newUserInformation.FirstName}\", \"{newUserInformation.LastName}\", " +
                    $"\"{newUserInformation.Email}\", \"{newUserInformation.UserBio}\", \"{newUserInformation.City}\", \"{newUserInformation.State}\")";
                connect.Open();
                connect.Query<UserInformation>(sql);
                connect.Close();
            }
        }

        public void RemoveUserInformation(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"delete from UserInformation " +
                    $"where Id={id}";
                connect.Open();
                connect.Query<UserInformation>(sql);
                connect.Close();
            }
        }

        public void EditUserInformation(int id, UserInformation modifiedUserInformation)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"update UserInformation " +
                    $"set FirstName = \"{modifiedUserInformation.FirstName}\", LastName = \"{modifiedUserInformation.LastName}\", " +
                    $"Email = \"{modifiedUserInformation.Email}\", UserBio = \"{modifiedUserInformation.UserBio}\", " +
                    $"City = \"{modifiedUserInformation.City}\", State = \"{modifiedUserInformation.State}\" " +
                    $"where Id = {id}";
                connect.Open();
                connect.Query<UserInformation>(sql);
                connect.Close();
            }
        }

        public bool ValidId(int id)
        {
            List<UserInformation> Users = GetUserInformations();
            foreach (var item in Users)
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
