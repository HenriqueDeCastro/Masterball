import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, mergeMap, Observable, tap, of, catchError } from 'rxjs';

import { PokemonDetail, PokemonGeneral } from 'src/app/shared/models/interfaces/pokemon';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';
import { TypeDetail } from './../../../shared/models/interfaces/type/type-detail/type-detail';
import { PokemonWithSlot } from 'src/app/shared/models/interfaces/type';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_api_pokemon = `${URL_POKEAPI}/pokemon`;
  private url_api_type = `${URL_POKEAPI}/type`;
  private pokemonsSubject = new BehaviorSubject<PokemonDetail[]>([]);
  private nextPageSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getPokemons(clearSubject?: boolean): Observable<PokemonDetail[]> {
    let params = new HttpParams();
    params = params.set('limit', environment.pokemons_pagination);
    params = params.set('offset', clearSubject? 0 : this.pokemonsSubject?.value?.length);

    return this.http.get<any>(this.url_api_pokemon, { params }).pipe(
      mergeMap((generalInfo: PokemonGeneral): Observable<any[]> => {
        return forkJoin(generalInfo?.results.map((pokemon: ResumeInfoPokeapi, index: number) => {
            const currentPokemons = this.pokemonsSubject.value.length + index;
            if(currentPokemons < environment.pokemons_count) {
              this.nextPageSubject.next(true);
              return this.http.get<PokemonDetail>(`${pokemon.url}`);
            } else {
              this.nextPageSubject.next(false);
              return of(null);
            }
        }))
      }),
      tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: clearSubject}))
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
        const pokemonsPage = this.paginationForType(typeDetail?.pokemon, options?.currentPage!, environment.pokemons_pagination);
        return forkJoin(pokemonsPage.map((pokemon: { pokemon: ResumeInfoPokeapi, slot: number }) => this.http.get<PokemonDetail>(`${pokemon?.pokemon?.url}`)));
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

  private paginationForType(pokemons: PokemonWithSlot[], currentPage: number, pageSize: number): PokemonWithSlot[]  {
    const pokemonsFilterBySlot = pokemons?.filter((pokemon: { pokemon: ResumeInfoPokeapi, slot: number }) => {
        const pokemonId = pokemon?.pokemon?.url.match('([^/]+)/?$')![1];
        return pokemon?.slot === 1 && Number(pokemonId) <= environment.pokemons_count;
    });
    const pokemonsPagination = pokemonsFilterBySlot.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
    return pokemonsPagination;
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
