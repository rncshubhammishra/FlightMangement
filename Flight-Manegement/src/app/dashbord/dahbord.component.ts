import { Component, Inject, OnInit } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-dahbord',
  templateUrl: './dahbord.component.html',
  styleUrls: ['./dahbord.component.scss']
})
export class DahbordComponent implements OnInit {

  lstOrders:Array<any>=[];
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,private _flightService:FlightService) { }

  ngOnInit(): void {
    this.getOderDetails();
  }
  getOderDetails():void{
    this._flightService.getOrderDetails(this.storage.get("userId")).subscribe(res=>this.getOderDetailsSuccess(res),err=>this.getOderDetailsError(err));
  }

  getOderDetailsSuccess(res):void{
    debugger;
    if(res.success){
      this.lstOrders=res.result;
    }
  }

  getOderDetailsError(err):void{

  }

}
