using System;
using System.Collections.Generic;
using System.Text;

namespace FlightManegement_Entities.Model
{
    public class AddFlightModel
    {
        public Guid id { get; set; }
        public string flightNumber { get; set; }
        public string flightCompany { get; set; }
        public int noOfSeat { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
        public DateTime depatureDate { get; set; }
        public string depatureTime { get; set; }
        public string arrivalTime { get; set; }
        public int price { get; set; }
    }
}
