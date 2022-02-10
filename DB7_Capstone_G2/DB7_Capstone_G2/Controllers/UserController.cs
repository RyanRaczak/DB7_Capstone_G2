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
    public class UserController : ControllerBase
    {
        UserDAL db = new UserDAL();

        [HttpGet("all")]
        public List<User> GetUsers()
        {
            return db.GetUsers();
        }

        [HttpGet("byId/{id}")]
        public User GetUser(int id)
        {
            if (db.ValidId(id))
            {
                return db.GetUser(id);
            }
            else
            {
                User error = new User();
                error.UserName = "Invalid Search Criteria";
                return error;
            }
        }

        [HttpGet("byUserName/{userName}")]
        public string GetUserByName(string userName)
        {
            return db.GetUserByName(userName);
        }

        [HttpPost("login")]
        public User GetLogin(User u)
        {
            return db.GetLogin(u);
        }

        [HttpPost("addUser")]
        public bool AddUser(User newUser)
        {
            bool duplicate = false;
            if (!db.ValidId(newUser.UserId))
            {
                List<User> users = db.GetUsers();
                foreach (var user in users)
                {
                    if (user.UserName.Trim().ToLower() == newUser.UserName.Trim().ToLower())
                    {
                        duplicate = true;
                    }
                }
                if (!duplicate)
                {
                    db.AddUser(newUser);
                    return true;
                }
            }
            return false;
        }

        [HttpDelete("removeUser/{id}")]
        public void RemoveUser(int id)
        {
            if (db.ValidId(id))
            {
                db.RemoveUser(id);
            }
        }

        [HttpPut("editUser/{id}")]
        public void EditUser(int id, User modifiedUser)
        {
            if (db.ValidId(id))
            {
                User oldUser = db.GetUser(id);
                if (modifiedUser.UserName == null || modifiedUser.UserName == "")
                {
                    modifiedUser.UserName = oldUser.UserName;
                }
                if (modifiedUser.UserPassword == null || modifiedUser.UserPassword == "")
                {
                    modifiedUser.UserPassword = oldUser.UserPassword;
                }
                db.EditUser(id, modifiedUser);
            }
        }
    }
}
