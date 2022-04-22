import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersPokemonComponent } from './filters-pokemon.component'
import { MatDividerModule } from '@angular/material/divider';
import { PokedexNameModule } from 'src/app/shared/pipes/pokedex-name/pokedex-name.module';

@NgModule({
  declarations: [ FiltersPokemonComponent ],
  imports: [ CommonModule, MatDividerModule, PokedexNameModule ],
  exports: [ FiltersPokemonComponent ]
})
export class FiltersPokemonModule { }
