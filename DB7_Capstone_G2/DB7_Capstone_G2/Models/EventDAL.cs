using Dapper;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DB7_Capstone_G2.Models
{
    public class EventDAL
    {
        string connection = Secret.Connection;

        public List<Event> GetEvents()
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = "select * from events";
                connect.Open();
                List<Event> output = connect.Query<Event>(sql).ToList();
                foreach (var item in output)
                {
                    string sqlAttendees = $"call nova.GetEventAttendees({item.EventId})";
                    item.Attendees = connect.Query<UserInformation>(sqlAttendees).ToList();
                }
                connect.Close();
                return output;
            }
        }

        public Event GetEvent(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"select * from events " +
                    $"where EventId = {id}";
                string sqlAttendees = $"call nova.GetEventAttendees({id})";
                connect.Open();
                Event output = connect.Query<Event>(sql).ToList().First();
                output.Attendees = connect.Query<UserInformation>(sqlAttendees).ToList();
                connect.Close();
                return output;
            }
        }

        public void AddAttendee(int eventId, int userId)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"insert into EventAttendance " +
                    $"values({eventId},{userId})";
                connect.Open();
                connect.Query<Object>(sql);
                connect.Close();
            }
        }

        public void RemoveAttendee(int eventId, int userId)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"delete from EventAttendance " +
                    $"where EventID = {eventId} AND Attendee = {userId}";
                connect.Open();
                connect.Query<Object>(sql);
                connect.Close();
            }
        }

        public void AddEvent(Event newEvent)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string mySqlDateTime = newEvent.EventDate.ToString("yyyy-MM-dd HH:mm:ss");
                string sql = $"insert into events " +
                    $"values({0}, {newEvent.CreatedBy}, \"{newEvent.EventName}\", \"{newEvent.EventDescription}\", " +
                    $"\"{mySqlDateTime}\", {newEvent.EventCapacity}, \"{newEvent.EventCity}\", \"{newEvent.EventState}\")";
                connect.Open();
                connect.Query<Event>(sql);
                connect.Close();
            }
        }

        public void RemoveEvent(int id)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string sql = $"delete from events " +
                    $"where EventId={id}";
                connect.Open();
                connect.Query<Event>(sql);
                connect.Close();
            }
        }

        public void EditEvent(int id, Event modifiedEvent)
        {
            using (var connect = new MySqlConnection(connection))
            {
                string mySqlDateTime = modifiedEvent.EventDate.ToString("yyyy-MM-dd HH:mm:ss");
                string sql = $"update events " +
                    $"set EventName = \"{modifiedEvent.EventName}\", EventDescription = \"{modifiedEvent.EventDescription}\", " +
                    $"EventDate = \"{mySqlDateTime}\", EventCapacity = {modifiedEvent.EventCapacity}, " +
                    $"EventCity = \"{modifiedEvent.EventCity}\", EventState = \"{modifiedEvent.EventState}\" " +
                    $"where EventId = {id}";
                connect.Open();
                connect.Query<Event>(sql);
                connect.Close();
            }
        }

        public bool ValidId(int id)
        {
            List<Event> events = GetEvents();
            foreach (var item in events)
            {
                if (item.EventId == id)
                {
                    return true;
                }
            }
            return false;
        }

    }
}
