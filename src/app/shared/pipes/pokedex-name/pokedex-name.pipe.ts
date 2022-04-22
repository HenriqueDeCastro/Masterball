import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokedexName'
})
export class PokedexNamePipe implements PipeTransform {

  transform(value: string): string {
    let stringTransform: string;
    stringTransform = value.replace(/-/gi, ' ');
    stringTransform = stringTransform.replace(/original/gi, '');

    if(stringTransform.includes('updated')) {
      stringTransform = stringTransform.replace(/updated/gi, '');
      stringTransform = `${stringTransform} Updated`;
    }

    if(stringTransform.includes('letsgo')) {
      stringTransform = stringTransform.replace(/letsgo/gi, '');
      stringTransform = `${stringTransform} (Let's Go)`;
    }

    if(stringTransform.includes('extended')) {
      stringTransform = stringTransform.replace(/extended/gi, '');
      stringTransform = `${stringTransform} Extended`;
    }

    const upperCase = stringTransform.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();});
    return upperCase;
  }

}
