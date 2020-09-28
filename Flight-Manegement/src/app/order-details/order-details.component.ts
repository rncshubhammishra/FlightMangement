import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  depatureResult:any;
  returnResult:any;
  orderId:string;
  constructor(private _flightService:FlightService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.orderId=params["id"];
    
    });
  }

  ngOnInit(): void {
    this.depatureResult=this._flightService.lstSearchResult;
    this.returnResult=this._flightService.lstReturnSearchResult;
  }

  getDate():Date{
    return new Date();
  }

}
