import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared,module';


@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    ResultRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ResultModule { }
