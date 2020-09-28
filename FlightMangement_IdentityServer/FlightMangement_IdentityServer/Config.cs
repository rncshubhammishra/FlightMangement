// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace CompliancePlatform_IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
                   new IdentityResource[]
                   {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                   };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {

            new ApiScope("api", "My API #1")
            //    new ApiScope("scope2"),
            };
       

        public static IEnumerable<Client> Clients =>
            new Client[]
            { 
                // m2m client credentials flow client
               new Client {
                    ClientId = "flightManegement",
                    ClientName = "Flight Manegement",
                    ClientSecrets = { new Secret("flightManegement".ToSha256())},
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    AllowedScopes =  {"openid","profile"},
                    AccessTokenLifetime = 1200,
                    AuthorizationCodeLifetime = 1200,
                    IdentityTokenLifetime = 1200
                }
                  
            };
    }
}