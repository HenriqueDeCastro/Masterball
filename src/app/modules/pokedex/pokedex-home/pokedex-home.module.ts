import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexHomeRoutingModule } from './pokedex-home-routing.module';
import { PokedexHomeComponent } from './pokedex-home.component';

import { CardPokemonModule } from './components/card-pokemon/card-pokemon.module';
import { BtnViewMoreModule } from 'src/app/shared/components/btn-view-more/btn-view-more.module';
import { SearchFieldModule } from 'src/app/shared/components/search-field/search-field.module';
import { BtnFilterModule } from 'src/app/shared/components/btn-filter/btn-filter.module';
import { FiltersPokemonModule } from './components/filters-pokemon/filters-pokemon.module';
import { PokedexDescriptionModule } from 'src/app/shared/pipes/pokedex-description/pokedex-description.module';

@NgModule({
  declarations: [ PokedexHomeComponent ],
  imports: [
    CommonModule,
    PokedexHomeRoutingModule,
    CardPokemonModule,
    BtnViewMoreModule,
    BtnFilterModule,
    SearchFieldModule,
    FiltersPokemonModule,
    MatExpansionModule,
    PokedexDescriptionModule
  ]
})
export class PokedexHomeModule { }
