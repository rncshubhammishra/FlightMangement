import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FlightService } from '../services/flight.service';
import { BooingModel } from '../Shared/models';

@Component({
  selector: 'app-travler-info',
  templateUrl: './travler-info.component.html',
  styleUrls: ['./travler-info.component.scss']
})
export class TravlerInfoComponent implements OnInit {
infoForm:FormGroup;
  constructor(private _formBuilder: FormBuilder,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _flightService:FlightService,private _router:Router) { 
    this.CreateForm();
  }

  ngOnInit(): void {
   if(this.storage.get("isLogedIn")){
      this.infoForm.controls.Name.setValue(this.storage.get("name"));
      this.infoForm.controls.Email.setValue(this.storage.get("email"));
   }
  }

  CreateForm(): void {
		this.infoForm = this._formBuilder.group({
      Name: new FormControl('', [Validators.required]),
			Email: new FormControl('', [Validators.required, Validators.email]),
		
			// recaptcha:['',Validators.required]
		});
  }

  onSubmit():void{

    var lstTickets:Array<BooingModel>=[];  
    var model=new BooingModel();
    model.name=this.infoForm.controls.Name.value;
    model.email=this.infoForm.controls.Email.value;
    model.noOfSeat=this.storage.get("seat");
    model.flightId=this._flightService.lstSearchResult.id;
    model.price=this.getPrice(this.storage.get("seat"), this._flightService.lstSearchResult.price);
    if(this.storage.get("isLogedIn"))
    model.id=this.storage.get("userId");
    lstTickets.push(model)

    if(this._flightService.lstReturnSearchResult!=null){
      var retunModel=new BooingModel();
      retunModel.name=this.infoForm.controls.Name.value;
      retunModel.email=this.infoForm.controls.Email.value;
      retunModel.noOfSeat=this.storage.get("seat");
      retunModel.flightId=this._flightService.lstReturnSearchResult.id;
      retunModel.price=this.getPrice(this.storage.get("seat"), this._flightService.lstReturnSearchResult.price);
      if(this.storage.get("isLogedIn"))
      retunModel.id=this.storage.get("userId");
      lstTickets.push(retunModel)
    }


    this._flightService.bookTickets(lstTickets).subscribe(res=>this.bookTicktSuccess(res),err=>this.bookTickError(err));
  }

  bookTicktSuccess(res):void{
    debugger;
    if(res.success){
      this._router.navigate(["/order",res.orderId])
    }
  }
  bookTickError(err):void{

  }
  getPrice(seats,price):number{
    var basefare= (parseInt(seats) * price);
    var gstAmount= (basefare*18)/100;
    return basefare+gstAmount;
  }

}
