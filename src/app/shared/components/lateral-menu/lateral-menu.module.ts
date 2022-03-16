import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralMenuComponent } from './lateral-menu.component';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ LateralMenuComponent ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  exports: [ LateralMenuComponent ]
})
export class LateralMenuModule { }
