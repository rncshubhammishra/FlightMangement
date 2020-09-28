import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../Shared/models';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http:HttpClient) { }

  login(model:LoginModel):any{
    return this._http.post(environment.apiUrl+"Account/Authenticate",model);
  }
   registerUser(model):any{
    return this._http.post(environment.identityApiUrl+"Register/AddUser",model);
  }
}
