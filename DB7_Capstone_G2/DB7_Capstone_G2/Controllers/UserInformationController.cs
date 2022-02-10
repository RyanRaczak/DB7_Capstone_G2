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
    public class UserInformationController : ControllerBase
    {
        UserInformationDAL db = new UserInformationDAL();

        [HttpGet("all")]
        public List<UserInformation> GetUserInformations()
        {
            return db.GetUserInformations();
        }

        [HttpGet("byId/{id}")]
        public UserInformation GetUserInformation(int id)
        {
            if (db.ValidId(id))
            {
                return db.GetUserInformation(id);
            }
            else
            {
                UserInformation error = new UserInformation();
                error.FirstName = "Invalid Search Criteria";
                return error;
            }
        }

        [HttpGet("byUserId/{userId}")]
        public UserInformation GetUserInformationByUserId(int userId)
        {
            return db.GetUserInformationByUserId(userId);
        }

        [HttpPost("addUserInformation")]
        public void AddUserInformation(UserInformation newUserInformation)
        {
            if (!db.ValidId(newUserInformation.Id))
            {
                db.AddUserInformation(newUserInformation);
            }
        }

        [HttpDelete("removeUserInformation/{id}")]
        public void RemoveUserInformation(int id)
        {
            if (db.ValidId(id))
            {
                db.RemoveUserInformation(id);
            }
        }

        [HttpPut("editUserInformation/{id}")]
        public void EditUserInformation(int id, UserInformation modifiedUserInformation)
        {
            if (db.ValidId(id))
            {
                UserInformation oldUserInfo = db.GetUserInformation(id);
                if (modifiedUserInformation.FirstName == null || modifiedUserInformation.FirstName == "")
                {
                    modifiedUserInformation.FirstName = oldUserInfo.FirstName;
                }
                if(modifiedUserInformation.LastName == null || modifiedUserInformation.LastName == "")
                {
                    modifiedUserInformation.LastName = oldUserInfo.LastName;
                }
                if(modifiedUserInformation.Email == null || modifiedUserInformation.Email == "")
                {
                    modifiedUserInformation.Email = oldUserInfo.Email;
                }
                if (modifiedUserInformation.UserBio == null || modifiedUserInformation.UserBio == "")
                {
                    modifiedUserInformation.UserBio = oldUserInfo.UserBio;
                }
                if(modifiedUserInformation.City == null || modifiedUserInformation.City == "")
                {
                    modifiedUserInformation.City = oldUserInfo.City;
                }
                if(modifiedUserInformation.State == null || modifiedUserInformation.State == "")
                {
                    modifiedUserInformation.State = oldUserInfo.State;
                }
                db.EditUserInformation(id, modifiedUserInformation);
            }
        }
    }
}
