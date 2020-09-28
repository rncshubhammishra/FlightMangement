import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravlerInfoRoutingModule } from './travler-info-routing.module';
import { TravlerInfoComponent } from './travler-info.component';
import { SharedModule } from '../Shared/shared,module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TravlerInfoComponent],
  imports: [
    CommonModule,
    TravlerInfoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TravlerInfoModule { }
