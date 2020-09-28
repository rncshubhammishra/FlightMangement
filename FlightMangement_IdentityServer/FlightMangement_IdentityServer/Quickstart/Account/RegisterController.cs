using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CompliancePlatform_IdentityServer.Models;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace CompliancePlatform_IdentityServer.Quickstart.Account
{
    public class RegisterController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        
        private readonly SignInManager<ApplicationUser> _signInManager;
        public RegisterController(
           UserManager<ApplicationUser> userManager,
           SignInManager<ApplicationUser> signInManager)

        {
            _userManager = userManager;
            _signInManager = signInManager;

        }
        [HttpPost]
        public async Task<bool> AddUser([FromBody] UserSignupModel model)
        {
            
          
               var user = new ApplicationUser { Name = model.name, UserName = model.email, Email = model.email};
               var result = await _userManager.CreateAsync(user, model.password);
                if (result.Succeeded)
                {
                    var roles=await _userManager.AddToRoleAsync(user, model.role);
                 
                    if (roles.Succeeded)
                    {
                        var lstRoles =await  _userManager.GetRolesAsync(user);
                        await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("Id", user.Id));
                        await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("userName", user.UserName));
                        await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("name", user.Name));
                        await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("email", user.Email));
                       
                      

                    }

                    

                    return true;

                }
                else
                    return false;
           
            
        }

        [HttpGet]
       
        public string GetRoleList1()
        {
            string Result = string.Empty;

            try
            {
                string constr = @"Data Source=Essendis-compliance-dev.database.windows.net;Initial Catalog=essendis-compliance;Integrated Security=False;Persist Security Info=False;User ID=Essendis-compliance-dev-admin;Password=6t^&9W$8zpk8P8";
                SqlConnection conn = new SqlConnection(constr);
                if (conn.State == ConnectionState.Open)
                    conn.Close();
                conn.Open();
                return "true";

            }
            catch (Exception ex)
            {

                return ex.Message;
            }

            //return "test";


        }



    }

}
public class UserSignupModel
{
    public string username { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string name { get; set; }
    public int OrganizationId { get; set; }
    public string role { get; set; }
}
