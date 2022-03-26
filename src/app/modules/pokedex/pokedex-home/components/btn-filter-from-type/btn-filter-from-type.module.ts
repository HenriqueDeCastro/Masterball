import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnFilterFromTypeComponent } from './btn-filter-from-type.component';

@NgModule({
  declarations: [ BtnFilterFromTypeComponent ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ BtnFilterFromTypeComponent ]
})
export class BtnFilterFromTypeModule { }
