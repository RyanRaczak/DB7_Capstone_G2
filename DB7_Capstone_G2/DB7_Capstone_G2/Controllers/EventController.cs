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
    public class EventController : ControllerBase
    {
        EventDAL db = new EventDAL();
        UserInformationDAL userinfoDb = new UserInformationDAL();

        [HttpGet("all")]
        public List<Event> GetEvents()
        {
            return db.GetEvents();
        }

        [HttpGet("byId/{id}")]
        public Event GetEvent(int id)
        {
            if (db.ValidId(id))
            {
                return db.GetEvent(id);
            }
            else
            {
                Event error = new Event();
                error.EventName = "Invalid search criteria";
                return error;
            }
        }

        [HttpPost("addAttendee/e={eventId}-u={userId}")]
        public void AddAttendee(int eventId, int userId)
        {
            if (db.ValidId(eventId) && userinfoDb.ValidId(userId))
            {
                db.AddAttendee(eventId, userId);
            }
        }

        [HttpDelete("removeAttendee/e={eventId}-u={userId}")]
        public void RemoveAttendee(int eventId, int userId)
        {
            if (db.ValidId(eventId) && userinfoDb.ValidId(userId))
            {
                db.RemoveAttendee(eventId, userId);
            }
        }

        [HttpPost("addEvent")]
        public void AddEvent(Event newEvent)
        {
            if (!db.ValidId(newEvent.EventId))
            {
                db.AddEvent(newEvent);
            }
        }

        [HttpDelete("removeEvent/{id}")]
        public void RemoveEvent(int id)
        {
            if (db.ValidId(id))
            {
                db.RemoveEvent(id);
            }
        }

        [HttpPut("editEvent/{id}")]
        public void EditEvent(int id, Event modifiedEvent)
        {
            if (db.ValidId(id))
            {
                Event oldEvent = db.GetEvent(id);
                if (modifiedEvent.CreatedBy == 0)
                {
                    modifiedEvent.CreatedBy = oldEvent.CreatedBy;
                }
                if (modifiedEvent.EventCapacity == 0)
                {
                    modifiedEvent.EventCapacity = oldEvent.EventCapacity;
                }
                if (modifiedEvent.EventCity == null || modifiedEvent.EventCity == "")
                {
                    modifiedEvent.EventCity = oldEvent.EventCity;
                }
                if (modifiedEvent.EventDate == null)
                {
                    modifiedEvent.EventDate = oldEvent.EventDate;
                }
                if (modifiedEvent.EventDescription == null || modifiedEvent.EventDescription == "")
                {
                    modifiedEvent.EventDescription = oldEvent.EventDescription;
                }
                if (modifiedEvent.EventName == null || modifiedEvent.EventName == "")
                {
                    modifiedEvent.EventName = oldEvent.EventName;
                }
                if (modifiedEvent.EventState == null || modifiedEvent.EventState == "")
                {
                    modifiedEvent.EventState = oldEvent.EventState;
                }
                db.EditEvent(id, modifiedEvent);
            }
        }
    }
}
