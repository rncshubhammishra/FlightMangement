using System;
using System.Collections.Generic;
using System.Text;

namespace FlightManegement_Entities.Model
{
    public class BookingMoel
    {
        public string name { get; set; }
        public string email { get; set; }
        public string id { get; set; }
        public Guid flightId { get; set; }
        public int noOfSeat { get; set; }
        public int price { get; set; }

    }
}
