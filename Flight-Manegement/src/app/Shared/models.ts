export class LoginModel{
    email:string;
    password:string;
}
export class  FlightDetails{
    id:string;
    flightNumber:string;
    flightCompany:string;
    noOfSeat:number;
    origin:string;
    destination:string;
    depatureTime:string;
    arrivalTime:string;
    depatureDate:Date;
    price:number;

}

export class FlightSearchModel{
    noOfSeat:number;
    origin:string;
    destination:string;
    depatureTime:Date;
    returnDate:Date;
    arrivalTime:Date;
    isOneWay:boolean;
}

export class RegisterModel{
    name:string;
    email:string;
    password:string;
    role:string
}

export class BooingModel{
    name:string;
    email:string;
    noOfSeat:number;
    id:string;
    flightId:string;
    price:number;
}