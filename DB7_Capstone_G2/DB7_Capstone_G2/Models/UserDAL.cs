using Dapper;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class UserDAL
    {
        string connection = Secret.Connection;

        public List<User> GetUsers()
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = "select * from users";
                connect.Open();
                List<User> output = connect.Query<User>(sql).ToList();
                connect.Close();
                return output;
            }
        }

        public User GetUser(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"select * from users " +
                    $"where UserId = {id}";
                connect.Open();
                User output = connect.Query<User>(sql).ToList().First();
                connect.Close();
                return output;
            }
        }

        public string GetUserByName(string userName)
        {
            string output;
            try
            {
                List<User> users = GetUsers();
                output = users.Where(u => u.UserName == userName).First().UserId.ToString();
            }
            catch
            {
                output = "User not found";
            }
            return output;
        }

        public User GetLogin(User u)
        {
            try
            {
                using (var connect = new MySqlConnection(connection))
                {
                    string sql = $"select * from users " +
                                 $"where userName = \"{u.UserName}\" AND userpassword = \"{u.UserPassword}\"";
                    connect.Open();
                    User output = connect.Query<User>(sql).ToList().First();
                    connect.Close();
                    return output;
                }
            }
            catch
            {
                User error = null;
                return error;
            }
            
        }

        public void AddUser(User newUser)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"insert into users " +
                    $"values({0}, \"{newUser.UserName}\", \"{newUser.UserPassword}\", {newUser.IsAdmin})";
                connect.Open();
                connect.Query<User>(sql);
                connect.Close();
            }
        }


        public void RemoveUser(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"delete from users " +
                    $"where UserId={id}";
                connect.Open();
                connect.Query<User>(sql);
                connect.Close();
            }
        }

        public void EditUser(int id, User modifiedUser)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"update users " +
                    $"set UserName = \"{modifiedUser.UserName}\", UserPassword = \"{modifiedUser.UserPassword}\", IsAdmin = {modifiedUser.IsAdmin} " +
                    $"where UserId = {id}";
                connect.Open();
                connect.Query<User>(sql);
                connect.Close();
            }
        }

        public bool ValidId(int id)
        {
            List<User> Users = GetUsers();
            foreach (var item in Users)
            {
                if (item.UserId == id)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
