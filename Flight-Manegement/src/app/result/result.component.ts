import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { PopupComponent } from '../popup/popup.component';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  searchResult:any;
  returnResult:any;
  depatureSelection:any;
  retunSelection:any;
  isResult:boolean=true;
  gstAmount:number;
  totalAmount:number;
  constructor(private _flightService:FlightService,private _router:Router,public _dialog: MatDialog,@Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit(): void {
    debugger;
    this.searchResult=this._flightService.lstSearchResult;
    this.returnResult=this._flightService.lstReturnSearchResult;
  }

  onDepatureSelection(item):void{
    this.depatureSelection=item;
  }
  onReturnSelection(item):void{
    this.retunSelection=item;
  }
  onBookClick():void{
    debugger;
    this.isResult=false;
  }
  getBaseFare():number{
    if(this.retunSelection==null){

      var basefare= (parseInt(this.storage.get("seat")) * this.depatureSelection.price);
     this.gstAmount= (basefare*18)/100;
      this.totalAmount=basefare+this.gstAmount;

       return basefare;
    }
    else{

      var basefare= (parseInt(this.storage.get("seat")) * this.depatureSelection.price)+( (parseInt(this.storage.get("seat")) * this.retunSelection.price));
     this.gstAmount= (basefare*18)/100;
      this.totalAmount=basefare+this.gstAmount;

       return basefare;
    }
  }
  OpenModel(): void {
    
    const dialogRef = this._dialog.open(PopupComponent, { 
    disableClose: true ,
  
    width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this._flightService.lstSearchResult=this.depatureSelection;
      this._flightService.lstReturnSearchResult=this.retunSelection;
      if(result=="login"){
        this._router.navigateByUrl("/login");
      }
      else{
        this._router.navigateByUrl("/info");
      }
    // if(result!=null){
    //   this._flightService.addFlight(result).subscribe(res=>this.addFlightSuccess(res),err=>this.addFlightError(err));
    // }


    });

    

}
 

}
