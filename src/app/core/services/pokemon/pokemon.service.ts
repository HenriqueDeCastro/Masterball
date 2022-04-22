import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, mergeMap, Observable, tap, of, map, switchMap } from 'rxjs';

import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { TypeDetail } from './../../../shared/models/interfaces/type/type-detail/type-detail';
import { PokemonWithSlot } from 'src/app/shared/models/interfaces/type';
import { PokedexGeneral, PokedexPokemon, PokedexSubject } from 'src/app/shared/models/interfaces/pokedex';
import { LastParamUrlService } from '../../factorys/last-param-url/last-param-url.service';

const URL_POKEAPI = environment.url_pokeapi;
const PAGE_SIZE = 24;
const POKEMONS_COUNT = 898


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_api_pokemon = `${URL_POKEAPI}/pokemon`;
  private url_api_pokedex = `${URL_POKEAPI}/pokedex`;
  private url_api_type = `${URL_POKEAPI}/type`;
  private currentPage!: number;
  private pokemonsSubject: BehaviorSubject<PokemonDetail[]>;
  private pokedexSubject: BehaviorSubject<PokedexSubject>;
  private nextPageSubject:BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private lastParamUrlService: LastParamUrlService) {
    this.pokemonsSubject = new BehaviorSubject<PokemonDetail[]>([]);
    this.pokedexSubject = new BehaviorSubject<PokedexSubject>({});
    this.nextPageSubject = new BehaviorSubject<boolean>(false);
  }

  getPokemonsByPokedex(options?: { url?: string, search?: string, type?: string, clearSubject?: boolean }): Observable<PokemonDetail[]> {
    const url_request = options?.url ?? `${this.url_api_pokedex}/1`;

    if(this.pokedexSubject?.value?.url == url_request) {
      if(this.pokedexSubject?.value?.search !== options?.search || this.pokedexSubject?.value?.type !== options?.type) {
        this.currentPage = 0;
        this.pokedexSubject.next({ ...this.pokedexSubject.value, search: options?.search, type: options?.type });
      } else {
        this.currentPage++;
      }
      return this.pokedexSubject.asObservable().pipe(
        switchMap((pokedex: PokedexSubject): Observable<PokedexSubject> => {
          return this.pokemonsByType(pokedex);
        }),
        mergeMap((pokedex: PokedexSubject) => {
          return this.forkJoinPokemons(this.filterPokemons(pokedex.pokemons!, pokedex.search));
        }),
        tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: options?.clearSubject })),
      );

    } else {

      this.currentPage = 0;
      return this.http.get<PokedexGeneral>(url_request).pipe(
        map((generalInfo: PokedexGeneral) => {
          return {
            pokemons: generalInfo?.pokemon_entries,
            type: options?.type,
            search: options?.search,
            url: url_request
          };
        }),
        switchMap((pokedex: PokedexSubject): Observable<PokedexSubject> => {
          this.pokedexSubject.next(pokedex);
          return this.pokemonsByType(pokedex);
        }),
        mergeMap((pokedex: PokedexSubject): Observable<PokemonDetail[]> => {
          return this.forkJoinPokemons(this.filterPokemons(pokedex?.pokemons!, pokedex.search));
        }),
        tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: options?.clearSubject }))
      );
    }
  }

  private filterPokemons(pokemons: PokedexPokemon[], search?: string): PokedexPokemon[] {
    if(search) {
      pokemons = pokemons.filter((pokemon: PokedexPokemon) => pokemon?.pokemon_species.name?.includes(search));
    }
    const pagination = pokemons.slice(this.currentPage * PAGE_SIZE, this.currentPage * PAGE_SIZE + PAGE_SIZE);
    this.nextPageSubject.next((Math.ceil(pokemons.length/PAGE_SIZE) - 1) > this.currentPage);
    return pagination;
  }

  private forkJoinPokemons(pokemons: PokedexPokemon[]): Observable<PokemonDetail[]> {
    if(pokemons.length <= 0) {
      this.clearPokemons();
      return of();
    } else {
      return forkJoin(pokemons?.map((pokemon: PokedexPokemon) => {
        const pokemonId = this.lastParamUrlService.get(pokemon?.pokemon_species?.url);
        return this.http.get<PokemonDetail>(`${this.url_api_pokemon}/${pokemonId}`).pipe(
          map((pokemonDetail: PokemonDetail) => {
            return { ...pokemonDetail, id: pokemon.entry_number }
        }));
      }));
    }
  }

  private pokemonsByType(pokedex: PokedexSubject): Observable<PokedexSubject> {
    if(this.pokedexSubject?.value?.type) {
      return this.http.get<TypeDetail>(`${this.url_api_type}/${this.pokedexSubject?.value?.type}`).pipe(
        map((typeDetail: TypeDetail) => {
          const pokemonsFilterBySlot = typeDetail?.pokemon?.filter((pokemon: PokemonWithSlot) => {
            return pokemon?.slot === 1 && Number(pokemon?.pokemon?.url.match('([^/]+)/?$')![1]) <= POKEMONS_COUNT;
          });
          const pokedexByType: PokedexPokemon[] = this.pokedexSubject.value?.pokemons?.filter((pokemonSubject: PokedexPokemon) => {
            return pokemonsFilterBySlot?.some((pokemonFilter: PokemonWithSlot) =>  pokemonFilter.pokemon.name.split("-")[0] === pokemonSubject.pokemon_species.name)
          })!;
          return {
            ...pokedex,
            pokemons: pokedexByType
          };
        })
      );
    } else {
      return of(pokedex);
    }
  }

  private insertPokemons(pokemons: PokemonDetail[], options?: { clear?:boolean, search?: boolean}): void {
    if(options?.clear) {
      this.clearPokemons();
    }
    const pokemonsForSubject = options?.search? pokemons : this.pokemonsSubject.getValue().concat(pokemons);
    this.pokemonsSubject.next(pokemonsForSubject);

  }

  clearPokemons(): void {
    this.pokemonsSubject.next([]);
  }

  hasPokemons(): boolean {
    return this.pokemonsSubject?.value?.length > 0;
  }

  returnPokemons(): Observable<PokemonDetail[]> {
    return this.pokemonsSubject.asObservable();
  }

  returnNextPagePokemon(): Observable<boolean> {
    return this.nextPageSubject.asObservable();
  }
}
