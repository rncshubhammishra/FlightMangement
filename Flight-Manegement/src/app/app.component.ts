import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flight-Manegement';
  isLogedIn:boolean=false;  
  isUser:boolean=false;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,private _router:Router){

  }
  ngDoCheck(){
   
    if(this.storage.get("isLogedIn")){
      this.isLogedIn=true;
    }
    if(this.storage.get("rolel")=="user"){
      this.isUser=true;
    }
  }

  onLogOutClick():void{
    this.storage.clear();
    this._router.navigateByUrl("");
  }

  getMyOrders():void{
    this._router.navigateByUrl("/my-order");
  }
}
