import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TravlerInfoComponent} from './travler-info.component'
const routes: Routes = [
  {path:"",component:TravlerInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravlerInfoRoutingModule { }
