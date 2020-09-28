using System;
using System.Collections.Generic;
using System.Text;

namespace FlightManegement_Entities.Model
{
    public class RetrunClaimsModel
    {
        public string userId { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public string name { get; set; }
        public string accessToken { get; set; }
    }
}
