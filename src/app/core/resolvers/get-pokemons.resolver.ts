import { PokemonStorageService } from './../services/pokemon-storage/pokemon-storage.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { PokemonDetail } from './../../shared/models/interfaces/pokemon/pokemon-detail/pokemon-detail';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPokemonsResolver implements Resolve<PokemonDetail[] | null> {

  constructor(private pokemonService: PokemonService, private pokemonStorageService: PokemonStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonDetail[]> | null {
    if(!this.pokemonStorageService.hasPokemons()) {
      return this.pokemonService.getPokemons();
    } else {
      return null;
    }
  }
}
