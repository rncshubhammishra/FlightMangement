using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompliancePlatform_IdentityServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CompliancePlatform_IdentityServer.Quickstart.Account
{
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            this._roleManager = roleManager;

        }
        [HttpPost]
        public async Task<bool> AddRole([FromBody] RoleModel model)
        {
            var role = new IdentityRole { Name = model.RoleName };
            var result = await _roleManager.CreateAsync(role);

            if (result.Succeeded)
            {


                return true;

            }
            else
                return false;
        }

        [HttpGet]
        public IActionResult GetAllRole()
        {
            var roles = _roleManager.Roles.Where(x => x.Name != "Super Admin").ToList();
            var rolelist = new  List< RoleModel>();
            roles.ForEach(item => rolelist.Add(
                new RoleModel()
                {
                    RoleName = item.Name
                }));
            return Ok(rolelist);
        }
    }
    
}

public class RoleModel
{
    public string RoleName { get; set; }
    
}
