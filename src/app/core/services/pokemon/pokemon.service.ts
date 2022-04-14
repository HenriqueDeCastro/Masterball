import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, mergeMap, Observable, tap, of, catchError } from 'rxjs';

import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';
import { TypeDetail } from './../../../shared/models/interfaces/type/type-detail/type-detail';
import { PokemonWithSlot } from 'src/app/shared/models/interfaces/type';
import { EventPaginationData } from 'src/app/shared/models/interfaces/event';
import { PokedexGeneral, PokedexPokemon } from 'src/app/shared/models/interfaces/pokedex';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_api_pokemon = `${URL_POKEAPI}/pokemon`;
  private url_api_pokedex = `${URL_POKEAPI}/pokedex`;
  private url_api_type = `${URL_POKEAPI}/type`;
  private pokemonsSubject = new BehaviorSubject<PokemonDetail[]>([]);
  private nextPageSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllPokemons(options: { currentPage: number, clearSubject?: boolean, }): Observable<PokemonDetail[]> {
    return this.http.get<any>(`${this.url_api_pokedex}/1`).pipe(
      mergeMap((generalInfo: PokedexGeneral): Observable<any[]> => {

        const pokemonsPage = this.pagination(generalInfo?.pokemon_entries, options?.currentPage!, environment.pokemons_pagination);
        this.nextPageSubject.next(pokemonsPage.nextPage);

        return forkJoin(pokemonsPage?.value?.map((pokemon: PokedexPokemon) => this.http.get<PokemonDetail>(`${this.url_api_pokemon}/${pokemon?.entry_number}`)))
      }),
      tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: options?.clearSubject}))
    );
  }

  getPokemonBySearch(search: string): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.url_api_pokemon}/${search}`).pipe(
      tap((pokemon: PokemonDetail) => {
        this.insertPokemons([pokemon], { clear: true, search: true});
        this.nextPageSubject.next(false);
      }),
      catchError((error: any) => {
        this.clearPokemons();
        return of(error);
      })
    );
  }

  getPokemonsByType(type: string, options?:{ currentPage: number, clearSubject?: boolean }): Observable<PokemonDetail[]> {
    return this.http.get<any>(`${this.url_api_type}/${type}`).pipe(
      mergeMap((typeDetail: TypeDetail): Observable<any[]> => {

        const pokemonsFilterBySlot = typeDetail?.pokemon?.filter((pokemon: PokemonWithSlot) => {
          const pokemonId = pokemon?.pokemon?.url.match('([^/]+)/?$')![1];
          return pokemon?.slot === 1 && Number(pokemonId) <= environment.pokemons_count;
        });
        const pokemonsPage = this.pagination(pokemonsFilterBySlot, options?.currentPage!, environment.pokemons_pagination);
        this.nextPageSubject.next(pokemonsPage.nextPage);

        return forkJoin(pokemonsPage?.value.map((pokemon: PokemonWithSlot) => this.http.get<PokemonDetail>(`${pokemon?.pokemon?.url}`)));
      }),
      tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: options?.clearSubject }))
    );
  }

  private insertPokemons(pokemons: PokemonDetail[], options?: { clear?:boolean, search?: boolean}): void {
    if(options?.clear)
    this.clearPokemons();

    const pokemonsForSubject = options?.search? pokemons : this.pokemonsSubject.getValue().concat(pokemons);
    this.pokemonsSubject.next(pokemonsForSubject);

  }

  private pagination(array: any[], currentPage: number, pageSize: number): EventPaginationData  {
    const pagination = array.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
    const nextPage = (Math.ceil(array.length/pageSize) - 1) > currentPage;

    return {
      value: pagination,
      nextPage: nextPage
    };
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
