import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokedexDescription'
})
export class PokedexDescriptionPipe implements PipeTransform {

  transform(value: string): unknown {
    let stringTransform: string;
    stringTransform = value.replace(/\—.*/,'');
    stringTransform = stringTransform.replace(/dex/gi, 'Dex');

    return stringTransform;
  }

}
