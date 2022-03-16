import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokedexId'
})
export class PokedexIdPipe implements PipeTransform {

  transform(value: number): string {
    let numberWithZeros: string;

    if(value < 999) {
      numberWithZeros = ('00' + value).slice(-3);
    } else {
      numberWithZeros = value.toString();
    }

    return `#${numberWithZeros}`;
  }
}
