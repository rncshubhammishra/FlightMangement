
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightManegement_Entities.Model
{
    public  class SearchFlightModel
    {
      
        public string origin { get; set; }
        public string destination { get; set; }
        public DateTime depatureTime { get; set; }

        public int noOfSeat { get; set; }
    }

   
}
