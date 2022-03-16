import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexIdPipe } from './pokedex-id.pipe';

@NgModule({
  declarations: [ PokedexIdPipe ],
  imports: [ CommonModule ],
  exports: [ PokedexIdPipe ]
})
export class PokedexIdPipeModule { }
