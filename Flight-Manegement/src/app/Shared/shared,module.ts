import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [],
  imports: [
    
  ],
  exports:[
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    NgxSpinnerModule
    
    
  ]
})
export class SharedModule { }
