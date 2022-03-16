import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesHomeRoutingModule } from './games-home-routing.module';
import { GamesHomeComponent } from './games-home.component';

@NgModule({
  declarations: [ GamesHomeComponent ],
  imports: [
    CommonModule,
    GamesHomeRoutingModule
  ]
})
export class GamesHomeModule { }
