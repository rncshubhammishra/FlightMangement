﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManegement_IdentityServer.Data
{
    public class tbl_FlightDetails
    {
        public Guid Id { get; set; }
        public string FlightNumber { get; set; }
        public string FlightCompany { get; set; }
        public int NoOfSeat { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }

        public DateTime DepatureDate { get; set; }
        public string DepatureTime { get; set; }
        public string ArrivalTime { get; set; }
        public int Price { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedOn { get; set; }
    }
}
