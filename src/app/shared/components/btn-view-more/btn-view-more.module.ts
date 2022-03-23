import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnViewMoreComponent } from './btn-view-more.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ BtnViewMoreComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [ BtnViewMoreComponent ]
})
export class BtnViewMoreModule { }
