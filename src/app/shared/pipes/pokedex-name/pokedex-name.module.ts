import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexNamePipe } from './pokedex-name.pipe';

@NgModule({
  declarations: [ PokedexNamePipe ],
  imports: [ CommonModule ],
  exports: [ PokedexNamePipe ]
})
export class PokedexNameModule { }
