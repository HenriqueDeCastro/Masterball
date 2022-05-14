import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexDescriptionPipe } from './pokedex-description.pipe';

@NgModule({
  declarations: [ PokedexDescriptionPipe ],
  imports: [ CommonModule ],
  exports: [ PokedexDescriptionPipe ]
})
export class PokedexDescriptionModule { }
