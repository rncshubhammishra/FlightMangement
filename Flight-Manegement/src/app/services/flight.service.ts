import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlightDetails, FlightSearchModel } from '../Shared/models';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  lstSearchResult:any;
  lstReturnSearchResult:any;
  constructor(private _http:HttpClient) { }

  addFlight(model:FlightDetails):Observable<any>{
    return this._http.post(environment.apiUrl+"Flight/AddFlight",model);
  }
  getFlightList():Observable<any>{
    return this._http.get(environment.apiUrl+"Flight/GetFlightDetails");
  }
  deleteFlight(id):Observable<any>{
    debugger;
    return this._http.delete(environment.apiUrl+"Flight/DeleteFlight?flightId="+id);
  }
  searchFlight(model:any):Observable<any>{
    return this._http.post(environment.apiUrl+"Flight/SearchFlight",model);
  }
  bookTickets(model):Observable<any>{
    return this._http.post(environment.apiUrl+"Flight/BookFlight",model);
  }
  getOrderDetails(id):Observable<any>{
    return this._http.get(environment.apiUrl+"Flight/GetOrders?id="+id);
  }
}
