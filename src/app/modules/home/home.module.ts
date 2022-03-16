import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class HomeModule { }
