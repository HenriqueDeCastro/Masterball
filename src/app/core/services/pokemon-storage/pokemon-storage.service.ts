import { PokemonDetail } from './../../../shared/models/interfaces/pokemon/pokemon-detail/pokemon-detail';
import { Injectable } from '@angular/core';

const KEY = 'pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {

  returnPokemons(): PokemonDetail[] {
    return JSON.parse(sessionStorage.getItem(KEY) as string);
  }

  savePokemons(pokemons: PokemonDetail[]): void {
    sessionStorage.setItem(KEY, JSON.stringify(pokemons));
  }

  deletePokemons(): void {
    sessionStorage.removeItem(KEY);
  }

  hasPokemons(): boolean {
    return !!this.returnPokemons();
  }
}
