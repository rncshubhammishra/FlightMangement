import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FlightService } from '../services/flight.service';
import { FlightSearchModel } from '../Shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isRoundTrip:boolean;
  searchFlightForm:FormGroup;
  constructor(	private _formBuilder: FormBuilder,private spinner: NgxSpinnerService,private _flightService:FlightService,@Inject(SESSION_STORAGE) private storage: StorageService,private _router:Router) { 
    this.createSearchFLightForm();
  }

  ngOnInit(): void {
  }
  createSearchFLightForm(): void {
		this.searchFlightForm = this._formBuilder.group({
			origin: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      depatureDate: new FormControl('', [Validators.required]),
      returnDate: new FormControl('', []),
      seats: new FormControl('', [Validators.required]),
      roundTrip: new FormControl('', [Validators.required]),
	
		});
  }

  onSubmit():void{
    debugger;
    
    if(this.searchFlightForm.invalid){
      Object.keys(this.searchFlightForm.controls).forEach(field => {
        const control = this.searchFlightForm.get(field);
                
        control.markAsTouched({ onlySelf: true }); 
       // this.scrollToFirstInvalidControl();
           
      });
    }
    else{
      debugger;
      this.spinner.show();
      var searchArray:Array<FlightSearchModel>=[];
      var depatureModel=new FlightSearchModel();
      this.storage.set("seats",this.searchFlightForm.controls.seats.value);
      if(this.isRoundTrip){
      
        depatureModel.origin=this.searchFlightForm.controls.origin.value;
        depatureModel.destination=this.searchFlightForm.controls.destination.value;
        depatureModel.depatureTime=this.searchFlightForm.controls.depatureDate.value;
        depatureModel.noOfSeat=this.searchFlightForm.controls.seats.value;
        searchArray.push(depatureModel); 
        var returnModel=new FlightSearchModel();  
        returnModel.origin=this.searchFlightForm.controls.destination.value;
        returnModel.destination=this.searchFlightForm.controls.origin.value;
        returnModel.depatureTime=this.searchFlightForm.controls.returnDate.value;
        returnModel.noOfSeat=this.searchFlightForm.controls.seats.value;
        searchArray.push(returnModel);   
      }
      else{    
        depatureModel.origin=this.searchFlightForm.controls.origin.value;
        depatureModel.destination=this.searchFlightForm.controls.destination.value;
        depatureModel.depatureTime=this.searchFlightForm.controls.depatureDate.value;
        depatureModel.noOfSeat=this.searchFlightForm.controls.seats.value;
        searchArray.push(depatureModel);    
      }
      this._flightService.searchFlight(searchArray).subscribe(res=>this.searchFlightSuccess(res),err=>this.searchFlightError(err))
   
    }
   }

  searchFlightSuccess(res):void{
    debugger;
    if(res.success){
      this.storage.set("seat",this.searchFlightForm.controls.seats.value);
     // res.lstDepatureResults.noOfSeat=this.searchFlightForm.controls.seats.value;
      this._flightService.lstSearchResult=res.lstDepatureResults;
      if(res.lstReturnResult!=null){
     //   res.lstReturnResult.noOfSeat=this.searchFlightForm.controls.seats.value;
        this._flightService.lstReturnSearchResult=res.lstReturnResult;
      }
   
      else
      this._flightService.lstReturnSearchResult=null;
      this.spinner.hide();
      this._router.navigateByUrl("/result");
    }
  }
  searchFlightError(err):void{

  }
  hasError(controlName: string, errorName: string):any{
		return this.searchFlightForm.controls[controlName].hasError(errorName);
	};

  

}
