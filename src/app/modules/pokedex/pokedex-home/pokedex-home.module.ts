import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexHomeRoutingModule } from './pokedex-home-routing.module';
import { PokedexHomeComponent } from './pokedex-home.component';

import { CardPokemonModule } from './components/card-pokemon/card-pokemon.module';
import { BtnViewMoreModule } from 'src/app/shared/components/btn-view-more/btn-view-more.module';
import { BtnFilterFromTypeModule } from './components/btn-filter-from-type/btn-filter-from-type.module';
import { SearchFieldModule } from 'src/app/shared/components/search-field/search-field.module';

@NgModule({
  declarations: [ PokedexHomeComponent ],
  imports: [
    CommonModule,
    PokedexHomeRoutingModule,
    CardPokemonModule,
    BtnViewMoreModule,
    BtnFilterFromTypeModule,
    //SearchFieldModule
  ]
})
export class PokedexHomeModule { }
