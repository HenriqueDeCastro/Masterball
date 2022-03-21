import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnViewMoreComponent } from './btn-view-more.component';

@NgModule({
  declarations: [ BtnViewMoreComponent ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ BtnViewMoreComponent ]
})
export class BtnViewMoreModule { }
