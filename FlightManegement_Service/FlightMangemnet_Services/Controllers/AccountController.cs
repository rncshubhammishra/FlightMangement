using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CompliancePlatform_Services.Services;

using FlightManegement_Entities.Model;
using iText.Html2pdf;
using iText.Kernel.Pdf;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace CompliancePlatform_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        #region private members
      
        private  IAuthService _authService { get; set; }
      

        #endregion

        #region Constructor 
        public AccountController( IAuthService authService)
        {
           
            _authService = authService;
            
        }
        #endregion

      

   

        #region Authenticate user
        [HttpPost]
        [Route("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LogInModel model)
        {

            var user = await _authService.Authenticate(model.email, model.password);

            // if (user.UserId == 0 || user.Username == null)
            //   return BadRequest(new { message = user.Error });

            return Ok(new { token = user });
        }
        #endregion

       





    }

   
}