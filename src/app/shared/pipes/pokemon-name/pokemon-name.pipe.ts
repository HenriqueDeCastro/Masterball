import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {

  transform(value: string): string {
    const removeHyphens = value.replace(/-/gi, ' ');
    const upperCase = removeHyphens.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();});
    return upperCase;
  }

}
