import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DahbordComponent } from './dahbord.component';
import { SharedModule } from '../Shared/shared,module';

@NgModule({
  declarations: [DahbordComponent],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    SharedModule
  ]
})
export class DashbordModule { }
