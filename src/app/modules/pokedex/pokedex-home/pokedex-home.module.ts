import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexHomeRoutingModule } from './pokedex-home-routing.module';
import { PokedexHomeComponent } from './pokedex-home.component';

import { CardPokemonModule } from './components/card-pokemon/card-pokemon.module';

@NgModule({
  declarations: [
    PokedexHomeComponent
  ],
  imports: [
    CommonModule,
    PokedexHomeRoutingModule,
    CardPokemonModule
  ]
})
export class PokedexHomeModule { }
