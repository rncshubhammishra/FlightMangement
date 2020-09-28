using System;
using System.Collections.Generic;

namespace FlightManegement_Entities.Entities
{
    public partial class TblBookingDetails
    {
        public Guid Id { get; set; }
        public string OrderId { get; set; }
        public int NoOfSeat { get; set; }
        public int Price { get; set; }
        public string TravlerName { get; set; }
        public string TravlerEmail { get; set; }
        public Guid FlightId { get; set; }
        public string ApplicationUserId { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual AspNetUsers ApplicationUser { get; set; }
        public virtual TblFlightDetails Flight { get; set; }
    }
}
