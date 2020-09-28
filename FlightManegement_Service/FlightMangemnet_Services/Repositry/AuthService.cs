
using FlightManegement_Entities.Model;
using IdentityModel.Client;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using static IdentityModel.OidcConstants;

namespace CompliancePlatform_Services.Services
{
    public interface IAuthService
    {
        Task<RetrunClaimsModel> Authenticate(string username, string password);
    }
    public class AuthService : IAuthService
    {

        private IConfiguration  _configuration { get; set; }
        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<RetrunClaimsModel> Authenticate(string username, string password)
        {

            return await IssueToken(username, password);
        }

        private async Task<RetrunClaimsModel> IssueToken(string username, string password)
        {

            var client = new HttpClient();

           
            var discoveryDocument = await client.GetDiscoveryDocumentAsync("https://localhost:5001/");

            var tokenResponse = await client.RequestPasswordTokenAsync(
                new PasswordTokenRequest
                {
                    Address = discoveryDocument.TokenEndpoint,
                    ClientId = _configuration["clientId"],
                    ClientSecret = _configuration["clientSecret"],
                    Scope = _configuration["scope"],
                    UserName = username,
                    Password = password
                });
            var apiClient = new HttpClient();
            var userInfo = await apiClient.GetUserInfoAsync(
                           new UserInfoRequest()
                           {
                               Address = discoveryDocument.UserInfoEndpoint,
                               Token = tokenResponse.AccessToken
                           });

            RetrunClaimsModel retrunClaimsModel = new RetrunClaimsModel();
            retrunClaimsModel.accessToken = tokenResponse.AccessToken;
            foreach (var item in userInfo.Claims)
            {
                if (item.Type == "sub")
                    retrunClaimsModel.userId = item.Value;
               
                else if (item.Type == "roles")
                    retrunClaimsModel.role = item.Value;
                else if (item.Type == "email")
                    retrunClaimsModel.email = item.Value;
                else if (item.Type == "name")
                    retrunClaimsModel.name = item.Value;


            }



            return retrunClaimsModel;



        }
    }
}
