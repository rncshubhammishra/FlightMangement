import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../Shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private _formBuilder: FormBuilder,private _accountService:AccountService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.CreateForm();
  }
  CreateForm(): void {
		this.registerForm = this._formBuilder.group({
      Name: new FormControl('', [Validators.required]),
			Email: new FormControl('', [Validators.required, Validators.email]),
			Password: new FormControl('', [Validators.required]),
		
			// recaptcha:['',Validators.required]
		});
  }
  onSubmit():void{
    this.spinner.show();
  var model=new RegisterModel();
  model.email=this.registerForm.controls.Email.value;
  model.name=this.registerForm.controls.Name.value;
  model.password=this.registerForm.controls.Password.value;
  model.role='user';
    this._accountService.registerUser(model).subscribe(
      res=>{
        this.spinner.hide();
         if(res)
          alert("Account created successfully");
        
      }
    )
  }
}
