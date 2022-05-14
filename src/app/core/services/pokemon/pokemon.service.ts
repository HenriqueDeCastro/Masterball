import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, mergeMap, Observable, tap, of, map, switchMap, take } from 'rxjs';

import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { TypeDetail } from './../../../shared/models/interfaces/type/type-detail/type-detail';
import { PokemonWithSlot } from 'src/app/shared/models/interfaces/type';
import { PokedexGeneral, PokedexPokemon, PokedexSubject } from 'src/app/shared/models/interfaces/pokedex';
import { LastParamUrlService } from '../../factorys/last-param-url/last-param-url.service';

const URL_POKEAPI = environment.url_pokeapi;
const PAGE_SIZE = 24;
const POKEMONS_COUNT = 898;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_api_pokemon = `${URL_POKEAPI}/pokemon`;
  private url_api_pokedex = `${URL_POKEAPI}/pokedex`;
  private url_api_type = `${URL_POKEAPI}/type`;

  private pokedexSubject: BehaviorSubject<PokedexSubject>;
  private nextPageSubject:BehaviorSubject<boolean>;
  private currentPage!: number;

  constructor(private http: HttpClient, private lastParamUrlService: LastParamUrlService) {
    this.pokedexSubject = new BehaviorSubject<PokedexSubject>({});
    this.nextPageSubject = new BehaviorSubject<boolean>(false);
  }

  getPokemonsByPokedex(options?: { url?: string, search?: string, type?: string, clearSubject?: boolean }): Observable<PokemonDetail[]> {
    const url_request = options?.url ?? `${this.url_api_pokedex}/1`;

    if(this.pokedexSubject?.getValue()?.url == url_request) {
      if(this.pokedexSubject?.getValue()?.search !== options?.search || this.pokedexSubject?.getValue()?.type !== options?.type) {
        this.currentPage = 0;
        this.pokedexSubject.next({ ...this.pokedexSubject.getValue(), search: options?.search, type: options?.type });
      } else {
        this.currentPage++;
      }

      return this.pokedexSubject.asObservable().pipe(
        take(1),
        switchMap((pokedex: PokedexSubject): Observable<PokedexSubject> => this.pokemonsByType(pokedex)),
        mergeMap((pokedex: PokedexSubject) => this.forkJoinPokemons(this.filterPokemons(pokedex.pokemonsGeneral!, pokedex.search))),
        tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: options?.clearSubject }))
      );

    } else {

      this.currentPage = 0;

      return this.http.get<PokedexGeneral>(url_request).pipe(
        take(1),
        map((generalInfo: PokedexGeneral) => {
          return {
            pokemonsGeneral: generalInfo?.pokemon_entries,
            pokemonsDetails: this.pokedexSubject?.getValue()?.pokemonsDetails ?? [],
            type: options?.type,
            search: options?.search,
            url: url_request,
            description: generalInfo?.descriptions[generalInfo?.descriptions?.length - 1]?.description,
          };
        }),
        tap((pokedex: PokedexSubject) => this.pokedexSubject.next(pokedex)),
        switchMap((pokedex: PokedexSubject): Observable<PokedexSubject> => this.pokemonsByType(pokedex)),
        mergeMap((pokedex: PokedexSubject): Observable<PokemonDetail[]> => this.forkJoinPokemons(this.filterPokemons(pokedex?.pokemonsGeneral!, pokedex.search))),
        tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: options?.clearSubject }))
      );
    }
  }

  private filterPokemons(pokemons: PokedexPokemon[], search?: string): PokedexPokemon[] {
    if(search) {
      pokemons = pokemons.filter((pokemon: PokedexPokemon) => pokemon?.pokemon_species.name?.includes(search));
    }
    const pagination = pokemons?.slice(this.currentPage * PAGE_SIZE, this.currentPage * PAGE_SIZE + PAGE_SIZE);
    this.nextPageSubject.next((Math.ceil(pokemons?.length/PAGE_SIZE) - 1) > this.currentPage);
    return pagination;
  }

  private forkJoinPokemons(pokemons: PokedexPokemon[]): Observable<PokemonDetail[]> {
    if(pokemons?.length <= 0) {
      this.resetPokemons();
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
    if(this.pokedexSubject?.getValue()?.type) {
      return this.http.get<TypeDetail>(`${this.url_api_type}/${this.pokedexSubject?.getValue()?.type}`).pipe(
        map((typeDetail: TypeDetail) => {
          const pokemonsFilterBySlot = typeDetail?.pokemon?.filter((pokemon: PokemonWithSlot) => {
            return pokemon?.slot === 1 && Number(pokemon?.pokemon?.url.match('([^/]+)/?$')![1]) <= POKEMONS_COUNT;
          });
          const pokedexByType: PokedexPokemon[] = this.pokedexSubject.getValue()?.pokemonsGeneral?.filter((pokemonSubject: PokedexPokemon) => {
            return pokemonsFilterBySlot?.some((pokemonFilter: PokemonWithSlot) =>  pokemonFilter.pokemon.name.split("-")[0] === pokemonSubject.pokemon_species.name)
          })!;
          return { ...pokedex, pokemonsGeneral: pokedexByType };
        })
      );
    } else {
      return of(pokedex);
    }
  }

  private insertPokemons(pokemons: PokemonDetail[], options?: { clear?:boolean, search?: boolean}): void {
    if(options?.clear) {
      this.resetPokemons();
    }
    const pokemonsForSubject = options?.search? pokemons : this.pokedexSubject?.getValue()?.pokemonsDetails!.concat(pokemons);
    this.pokedexSubject.next({ ...this.pokedexSubject.getValue(), pokemonsDetails: pokemonsForSubject});
  }

  hasPokemons(): boolean {
    return this.pokedexSubject?.getValue()?.pokemonsDetails?.length! > 0;
  }

  returnPokedex(): Observable<PokedexSubject> {
    return this.pokedexSubject.asObservable();
  }

  returnNextPagePokemon(): Observable<boolean> {
    return this.nextPageSubject.asObservable();
  }

  resetPokemons(): void {
    this.pokedexSubject.next({...this.pokedexSubject.getValue(), pokemonsDetails: []})
  }

  resetPokedex(): void {
    this.pokedexSubject = new BehaviorSubject<PokedexSubject>({});
  }
}
