import { PokedexService } from 'src/app/core/services/pokedex/pokedex.service';
import { PokemonDetail } from '../../../shared/models/interfaces/pokemon/pokemon-detail/pokemon-detail';
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

  constructor(private pokedexService: PokedexService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonDetail[]> | null {
    if(this.pokedexService.hasPokemons()) {
      return null;
    }

    return this.pokedexService.get();
  }
}
