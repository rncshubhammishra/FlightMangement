import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { SharedModule } from '../Shared/shared,module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [AdminDashboardComponent, AddFlightsComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule,

  ],
  entryComponents:[AddFlightsComponent]

})
export class AdminDashboardModule { }
