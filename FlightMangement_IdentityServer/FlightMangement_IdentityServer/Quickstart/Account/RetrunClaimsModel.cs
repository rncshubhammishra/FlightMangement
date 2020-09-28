using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompliancePlatform_IdentityServer.Quickstart.Account
{
    public class RetrunClaimsModel
    {
        public string access_token { get; set; }
        public string userid { get; set; }
        public string user_email { get; set; }
        public string user_organisationId { get; set; }
        public string role { get; set; }
    }
}
