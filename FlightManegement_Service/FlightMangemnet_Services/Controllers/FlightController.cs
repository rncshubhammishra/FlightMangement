using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightManegement_Entities.Entities;
using FlightManegement_Entities.Model;
using FlightManegement_Services.Repositry;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlightManegement_Services.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        #region private member 
        private IFlightRepositry _repositry { get; set; }
        #endregion

        #region Contructor
        public FlightController(IFlightRepositry repositry)
        {
            _repositry = repositry;
        }
        #endregion

        #region Add flight 
        [Authorize(Roles = "admin")]
        [HttpPost]
        [Route("AddFlight")]
        public IActionResult AddFlight([FromBody] AddFlightModel model)
        {

            return Ok(new { success = _repositry.AddFlight(model) });
        }
        #endregion

        #region Get flight  details by id
        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("GetFlightDetailsById")]
        public IActionResult GetFlightDetailsById([FromQuery] Guid flightId)
        {

            return Ok(new { success = true,result= _repositry.GetFlightDetailsById(flightId) }); ;
        }
        #endregion

        #region Get flight  details by id
        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("GetFlightDetails")]
        public IActionResult GetFlightDetails()
        {

            return Ok(new { success = true, result = _repositry.GetFlightList() }); ;
        }
        #endregion

        #region Update flight details 
        [HttpPut]
        [Route("UpdateFlight")]
        public IActionResult UpdateFlight([FromBody] AddFlightModel model)
        {

            return Ok(new { success = true, result = _repositry.UpdateFlightDetails(model) }); ;
        }
        #endregion

        #region Delete flight details 
        [Authorize(Roles = "admin")]
        [HttpDelete]
        [Route("DeleteFlight")]
        public IActionResult DeleteFlight([FromQuery] Guid flightId)
        {

            return Ok(new { success =  _repositry.DeleteFlightDetails(flightId) }); ;
        }
        #endregion

        #region Search flight  
        [AllowAnonymous]
        [HttpPost]
        [Route("SearchFlight")]
        public IActionResult SearchFlight([FromBody] List<SearchFlightModel> models)
        {
            List<TblFlightDetails> returnResult = null;
            var depatureResult = _repositry.SearchFlights(models[0]);
            if (models.Count > 1)
            {
                returnResult =_repositry.SearchFlights(models[1]);
               
               
            }
            return Ok(new { success = true, lstDepatureResults = depatureResult, lstReturnResult = returnResult });

        }
        #endregion

        #region Book flight  
        [AllowAnonymous]
        [HttpPost]
        [Route("BookFlight")]
        public IActionResult BookFlight([FromBody] List<BookingMoel> models)
        {
            bool result = false;
            Random random = new Random();
            var orderId = "FM" + random.Next(100, 999).ToString();
            foreach(var item in models)
            {
                result = _repositry.BookTikctes(item, orderId);
            }
            if (result)
            {
                return Ok(new { success = true,orderId= orderId });
            }
            else
            {
                return Ok(new { success = false});
            }
        

        }
        #endregion

        #region Get orders
        [Authorize(Roles = "user")]
        [HttpGet]
        [Route("GetOrders")]
        public IActionResult GetOrders([FromQuery] string id)
        {
           
            return Ok(new { success = true, result=_repositry.GetOrderDetails(id) });

        }
        #endregion
    }
}
