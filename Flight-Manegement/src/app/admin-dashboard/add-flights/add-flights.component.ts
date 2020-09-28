import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightDetails } from 'src/app/Shared/models';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.scss']
})
export class AddFlightsComponent implements OnInit {
  flightDetails:FlightDetails;
  flightDetailsForm:FormGroup;
  constructor(private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddFlightsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

    this.flightDetails=new FlightDetails();
    this.createAddFlightForm();
   }

  ngOnInit(): void {
   debugger;
    if(this.data.type=="Update"){
    
     this.flightDetailsForm.controls.company.setValue(this.data.details.flightCompany);
     this.flightDetailsForm.controls.flightNumber.setValue(this.data.details.flightNumber);
    this.flightDetailsForm.controls.origin.setValue(this.data.details.origin);
    this.flightDetailsForm.controls.destination.setValue(this.data.details.destination);
    this.flightDetailsForm.controls.seats.setValue(this.data.details.noOfSeat);
    this.flightDetailsForm.controls.depatureTime.setValue(this.data.details.depatureTime);
    this.flightDetailsForm.controls.arrivalTime.setValue(this.data.details.arrivalTime);
    this.flightDetailsForm.controls.depatureDate.setValue(this.formatDate(this.data.details.depatureDate));
   this.flightDetailsForm.controls.price.setValue(this.data.details.price);
   this.flightDetails.id=this.data.details.id;

    }
    
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  createAddFlightForm():void{
    this.flightDetailsForm = this._formBuilder.group({
			flightNumber: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      origin: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      seats: new FormControl('', [Validators.required]),
      depatureDate: new FormControl('', [Validators.required]),
      depatureTime: new FormControl('', [Validators.required]),
      arrivalTime: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
		
		});
  }

  onSubmitClick():void{
    debugger;
    if(this.flightDetailsForm.invalid){
      Object.keys(this.flightDetailsForm.controls).forEach(field => {
        const control = this.flightDetailsForm.get(field);
                
        control.markAsTouched({ onlySelf: true }); 
       // this.scrollToFirstInvalidControl();
           
      });
    }
    else{
      this.flightDetails.flightCompany=this.flightDetailsForm.controls.company.value;
      this.flightDetails.flightNumber=this.flightDetailsForm.controls.flightNumber.value;
      this.flightDetails.origin=this.flightDetailsForm.controls.origin.value;
      this.flightDetails.destination=this.flightDetailsForm.controls.destination.value;
      this.flightDetails.arrivalTime=this.flightDetailsForm.controls.arrivalTime.value;
      this.flightDetails.depatureTime=this.flightDetailsForm.controls.depatureTime.value;
      this.flightDetails.noOfSeat=parseInt(this.flightDetailsForm.controls.seats.value);
      this.flightDetails.depatureDate=new Date(this.flightDetailsForm.controls.depatureDate.value);
      this.flightDetails.price=parseInt(this.flightDetailsForm.controls.price.value);
      this.dialogRef.close(this.flightDetails);
    }
   
  }

  formatDate(date):any{
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

hasError(controlName: string, errorName: string):any{
  return this.flightDetailsForm.controls[controlName].hasError(errorName);
};

 

}
