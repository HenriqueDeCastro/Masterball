import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from './card-pokemon.component';
import { PokedexIdPipeModule } from 'src/app/shared/pipes/pokedex-id/pokedex-id.pipe.module';
import { IconsTypesModule } from 'src/app/shared/components/icons-types/icons-types.module';

@NgModule({
  declarations: [ CardPokemonComponent ],
  imports: [
    CommonModule,
    PokedexIdPipeModule,
    IconsTypesModule
   ],
  exports: [ CardPokemonComponent ]
})
export class CardPokemonModule { }
