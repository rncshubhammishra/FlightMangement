using FlightManegement_Entities.Entities;
using FlightManegement_Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManegement_Services.Repositry
{
    public interface IFlightRepositry
    {
        bool AddFlight(AddFlightModel addFlightModel);

        List<TblFlightDetails> SearchFlights(SearchFlightModel searchFlightModels);

        bool DeleteFlightDetails(Guid flightId);

        bool UpdateFlightDetails(AddFlightModel addFlightModel);
        TblFlightDetails GetFlightDetailsById(Guid flightId);

        List<TblFlightDetails> GetFlightList();

        bool BookTikctes(BookingMoel model,string orderId);

        object GetOrderDetails(string id);
    }
    public class FlightRepositry : IFlightRepositry
    {
        private FlightMangementContext _dbContext { get; set; }
        public FlightRepositry(FlightMangementContext context)
        {
            _dbContext = context;
        }

        #region Add flight details 
        public bool AddFlight(AddFlightModel addFlightModel)
        {
            bool result = false;
            try
            {
                if (addFlightModel.id == Guid.Empty)
                {
                    TblFlightDetails tblFlightDetails = new TblFlightDetails();
                    tblFlightDetails.Id = Guid.NewGuid();
                    tblFlightDetails.FlightNumber = addFlightModel.flightNumber;
                    tblFlightDetails.FlightCompany = addFlightModel.flightCompany;
                    tblFlightDetails.Origin = addFlightModel.origin;
                    tblFlightDetails.Destination = addFlightModel.destination;
                    tblFlightDetails.DepatureTime = addFlightModel.depatureTime;
                    tblFlightDetails.NoOfSeat = addFlightModel.noOfSeat;
                    tblFlightDetails.ArrivalTime= addFlightModel.arrivalTime;
                    tblFlightDetails.DepatureDate = addFlightModel.depatureDate;
                    tblFlightDetails.Price = Convert.ToInt32(addFlightModel.price);
                    _dbContext.TblFlightDetails.Add(tblFlightDetails);
                }
                else
                {
                    var flightDetails = _dbContext.TblFlightDetails.FirstOrDefault(x => x.Id == addFlightModel.id);
                    flightDetails.FlightNumber = addFlightModel.flightNumber;
                    flightDetails.FlightCompany = addFlightModel.flightCompany;
                    flightDetails.Origin = addFlightModel.origin;
                    flightDetails.Destination = addFlightModel.destination;
                    flightDetails.DepatureTime = addFlightModel.depatureTime;
                    flightDetails.NoOfSeat = addFlightModel.noOfSeat;
                    flightDetails.ArrivalTime = addFlightModel.arrivalTime;
                    flightDetails.DepatureDate = addFlightModel.depatureDate;
                    flightDetails.Price = Convert.ToInt32(addFlightModel.price);
                    _dbContext.TblFlightDetails.Update(flightDetails);
                }
                
                _dbContext.SaveChanges();
                result = true;


            }
            catch(Exception ex)
            {
                result = false;
            }
            return result;
        }
        #endregion

        #region Search flights 
        //public List<IEnumerable<TblFlightDetails>> SearchFlights(List<SearchFlightModel> searchFlightModels)
        //{


        //    List<IEnumerable<TblFlightDetails>> lstFlightResult = new List<IEnumerable<TblFlightDetails>>();
        //    foreach (var criteria in searchFlightModels)
        //    {
        //        lstFlightResult.Add(_dbContext.TblFlightDetails.Where(x => x.Origin.ToLower() == criteria.origin.ToLower() && x.Destination.ToLower() == criteria.destination.ToLower() && x.DepatureDate == criteria.depatureTime && x.NoOfSeat>=criteria.noOfSeat));
        //    }
        //    return lstFlightResult;
        //}
        public List<TblFlightDetails> SearchFlights(SearchFlightModel searchFlightModels)
        {

            return _dbContext.TblFlightDetails.Where(x => x.Origin.ToLower() == searchFlightModels.origin.ToLower() && x.Destination.ToLower() == searchFlightModels.destination.ToLower() && x.DepatureDate == searchFlightModels.depatureTime && x.NoOfSeat >= searchFlightModels.noOfSeat).ToList();
          //  List<IEnumerable<TblFlightDetails>> lstFlightResult = new List<IEnumerable<TblFlightDetails>>();
          
        }
        #endregion

        #region Book ticket
        public bool BookTikctes(BookingMoel model,string orderId)
        {
           
            bool result = false;
            try
            {
                var flightDetails = _dbContext.TblFlightDetails.FirstOrDefault(x => x.Id == model.flightId);
                TblBookingDetails bookingDetails = new TblBookingDetails();
                bookingDetails.Id = Guid.NewGuid();
                bookingDetails.NoOfSeat = model.noOfSeat;
                bookingDetails.FlightId = model.flightId;
                bookingDetails.Price = model.price;
                bookingDetails.TravlerEmail = model.email;
                bookingDetails.TravlerName = model.name;
                bookingDetails.OrderId = orderId;
                if (model.id != null)
                    bookingDetails.ApplicationUserId = model.id;
                _dbContext.TblBookingDetails.Add(bookingDetails);
                flightDetails.NoOfSeat -= model.noOfSeat;
                _dbContext.TblFlightDetails.Update(flightDetails);
                _dbContext.SaveChanges();
                result = true;
            }
            catch(Exception ex)
            {
                result = false; ;
            }
            return result;
      



        }
        #endregion
        #region Update Flight Details 
        public bool UpdateFlightDetails(AddFlightModel addFlightModel)
        {
            bool result = false;
            try
            {
                var flightDetails = _dbContext.TblFlightDetails.FirstOrDefault(x => x.Id == addFlightModel.id);
                flightDetails.FlightNumber = addFlightModel.flightNumber;
                flightDetails.FlightCompany = addFlightModel.flightCompany;
                flightDetails.Origin = addFlightModel.origin;
                flightDetails.Destination = addFlightModel.destination;
                flightDetails.DepatureTime = addFlightModel.depatureTime;
                flightDetails.NoOfSeat = addFlightModel.noOfSeat;
                flightDetails.Price = Convert.ToInt32(addFlightModel.price);
                _dbContext.TblFlightDetails.Update(flightDetails);
                _dbContext.SaveChanges();
                result = true;


            }
            catch (Exception ex)
            {
                result = false;
            }
            return result;
        }
        #endregion

        #region Delete flight details 
        public bool DeleteFlightDetails(Guid  flightId)
        {
            bool result = false;
            try
            {
                var flightDetails = _dbContext.TblFlightDetails.FirstOrDefault(x => x.Id == flightId);
               
                _dbContext.TblFlightDetails.Remove(flightDetails);
                _dbContext.SaveChanges();
                result = true;


            }
            catch (Exception ex)
            {
                result = false;
            }
            return result;
        }
        #endregion

        #region Get flight By id 
        public TblFlightDetails GetFlightDetailsById(Guid flightId)
        {
           
                return _dbContext.TblFlightDetails.FirstOrDefault(x => x.Id == flightId);

             
        }
        #endregion

        #region get flight list
        public List<TblFlightDetails> GetFlightList()
        {
            return _dbContext.TblFlightDetails.ToList();
        }
        #endregion

        #region Get user orderList
        public object GetOrderDetails(string id)
        {
           return from booking in _dbContext.TblBookingDetails
                       join flights in _dbContext.TblFlightDetails
                        on booking.FlightId equals flights.Id
                       where booking.ApplicationUserId == id
                       select new
                       {
                           bookingId = booking.Id,
                           flightId = booking.FlightId,
                           flightNumber = flights.FlightNumber,
                           flightCompany = flights.FlightCompany,
                           origin = flights.Origin,
                           destination = flights.Destination,
                           date = flights.DepatureDate,
                           seats = booking.NoOfSeat,
                           price = booking.Price,
                           orderId=booking.OrderId

                       };
        }

        #endregion


    }
}
