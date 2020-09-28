import { Component, Inject, OnInit } from '@angular/core';
import { LoginModel } from '../Shared/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AccountService} from '../services/account.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(	private _formBuilder: FormBuilder,private _accountService:AccountService,
    @Inject(SESSION_STORAGE) private storage: StorageService,private spinner: NgxSpinnerService,private _router:Router,private _flghtService:FlightService) { }

  ngOnInit(): void {
    this.CreateLoginForm();
  }
  CreateLoginForm(): void {
		this.loginForm = this._formBuilder.group({
			Email: new FormControl('', [Validators.required, Validators.email]),
			Password: new FormControl('', [Validators.required]),
		
			// recaptcha:['',Validators.required]
		});
  }
  onbtnLoginClick(): void {
    debugger;
    this.spinner.show();
    var loginModel=new LoginModel();
    loginModel.email=this.loginForm.controls.Email.value;
    loginModel.password=this.loginForm.controls.Password.value;
    this._accountService.login(loginModel).subscribe(res=>this.loginSuccess(res),err=>this.loginError(err))
    
		
  }
  loginSuccess(res):void{
    debugger;
    if(res.token!=null){
      this.storage.set("acessToken",res.token.accessToken)
       this.storage.set("email",res.token.email)
       this.storage.set("userId",res.token.userId)
       this.storage.set("role",res.token.role)
       this.storage.set("isLogedIn",true)
       this.spinner.hide();
       if(res.token.role=="admin")
        this._router.navigateByUrl("/admin")
       else if(res.token.role=="user"){
          if(this._flghtService.lstSearchResult!=null)
          this._router.navigateByUrl("/info")
          else
          this._router.navigateByUrl("/user")
       }

    }
  }
  loginError(err):void{
   
  }

}
