import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from './Shared/shared,module';
import {AuthHttpInterceptor} from './authIntercepter'
import {AuthGuard} from './Shared/authGuard';
import { PopupComponent } from './popup/popup.component'
@NgModule({
  declarations: [
    AppComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
