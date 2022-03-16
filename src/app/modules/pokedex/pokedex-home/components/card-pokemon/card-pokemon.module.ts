import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from './card-pokemon.component';
import { CardPokemonTypesModule } from '../card-pokemon-types/card-pokemon-types.module';
import { PokedexIdPipeModule } from 'src/app/shared/pipes/pokedex-id/pokedex-id.pipe.module';

@NgModule({
  declarations: [ CardPokemonComponent ],
  imports: [
    CommonModule,
    CardPokemonTypesModule,
    PokedexIdPipeModule
   ],
  exports: [ CardPokemonComponent ]
})
export class CardPokemonModule { }
