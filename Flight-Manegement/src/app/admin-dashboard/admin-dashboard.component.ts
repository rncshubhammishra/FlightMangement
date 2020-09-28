import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { FlightService } from '../services/flight.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource:any;
  displayedColumns: string[] = ['flightNumber', 'company', 'origin','destination','depatureDate','depatureTime','arrivalTime','seats','price','action'];
  constructor( public _dialog: MatDialog,private _flightService:FlightService) { }

  ngOnInit(): void {
    this.getListOfAvilableFlights();
  }

  OpenNewBoqItemModel(): void {
    
    const dialogRef = this._dialog.open(AddFlightsComponent, { 
    disableClose: true ,
    data:{type:"Add",},
    width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    if(result!=null){
      this._flightService.addFlight(result).subscribe(res=>this.addFlightSuccess(res),err=>this.addFlightError(err));
    }


    });

    

}
addFlightSuccess(res):void{
  if(res.success){
     alert("Flight added successfully");
    this.getListOfAvilableFlights();
  }   
  else{
    alert("Some thing went wrong");
  }
}
addFlightError(err):void{}

getListOfAvilableFlights():void{
  this._flightService.getFlightList().subscribe(res=>this.getListOfFlightSuccess(res),err=>this.getListFlightError(err));
}

getListOfFlightSuccess(res):void{
  debugger;
  if(res.success){
    this.dataSource=new MatTableDataSource(res.result);
    this.dataSource.paginator = this.paginator;
  }

}
getListFlightError(err){}

onEditClick(element):void{
  const dialogRef = this._dialog.open(AddFlightsComponent, { 
    data:{type:"Update",details:element},
    disableClose: true ,
    width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    if(result!=null){
      this._flightService.addFlight(result).subscribe(res=>this.addFlightSuccess(res),err=>this.addFlightError(err));
    }


    });
}

onDeleteClick(id):void{
  debugger;
  this._flightService.deleteFlight(id).subscribe(res=>this.deleteFlightSuccess(res),err=>this.deleteFlightError(err));
}

deleteFlightSuccess(res):void{
  if(res.success){
    alert("flight deleted sucessfully");
    this.getListOfAvilableFlights();
  }
  else{
    alert("Something goes wrong");
  }
}
deleteFlightError(err):void{

}
}

