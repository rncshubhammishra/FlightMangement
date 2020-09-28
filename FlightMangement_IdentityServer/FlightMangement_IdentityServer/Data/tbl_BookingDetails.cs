using CompliancePlatform_IdentityServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManegement_IdentityServer.Data
{
    public class tbl_BookingDetails
    {
        public Guid Id { get; set; }
       

        public string OrderId { get; set; }
        public int NoOfSeat { get; set; }
      
     
        public int Price { get; set; }

        public string TravlerName { get; set; }

        public string TravlerEmail { get; set; }
        public Guid FlightId { get; set; }

        public virtual tbl_FlightDetails Flight { get; set; }
        public string ApplicationUserId { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public DateTime CreatedOn { get; set; }


    }
}
