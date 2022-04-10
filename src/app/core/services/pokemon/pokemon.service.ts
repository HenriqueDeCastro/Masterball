import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, mergeMap, Observable, tap, of, catchError } from 'rxjs';

import { PokemonDetail, PokemonGeneral } from 'src/app/shared/models/interfaces/pokemon';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';
import { TypeDetail } from './../../../shared/models/interfaces/type/type-detail/type-detail';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_api_pokemon = `${URL_POKEAPI}/pokemon`;
  private url_api_type = `${URL_POKEAPI}/type`;
  private pokemonsSubject = new BehaviorSubject<PokemonDetail[]>([]);

  constructor(private http: HttpClient) {}

  getPokemons(clearSubject?: boolean): Observable<PokemonDetail[]> {
    let params = new HttpParams();
    params = params.set('limit', environment.pokemons_pagination);
    params = params.set('offset', clearSubject? 0 : this.pokemonsSubject?.value?.length);

    return this.http.get<any>(this.url_api_pokemon, { params }).pipe(
      mergeMap((generalInfo: PokemonGeneral): Observable<any[]> => {
        return forkJoin(generalInfo?.results.map((pokemon: ResumeInfoPokeapi, index: number) =>
          (this.pokemonsSubject.value.length + index) < environment.pokemons_count? this.http.get<PokemonDetail>(`${pokemon.url}`) : of(null)
        ))
      }),
      tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: clearSubject}))
    );
  }

  getPokemonBySearch(search: string): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.url_api_pokemon}/${search}`).pipe(
      tap((pokemon: PokemonDetail) => this.insertPokemons([pokemon], { clear: true, search: true})),
      catchError((error: any) => {
        this.clearPokemons();
        return of(error);
      })
    );
  }

  getPokemonsByType(type: string, clearSubject?: boolean): Observable<PokemonDetail[]> {
    return this.http.get<any>(`${this.url_api_type}/${type}`).pipe(
      mergeMap((typeDetail: TypeDetail): Observable<any[]> => {
         return forkJoin(typeDetail?.pokemon.map((pokemon: { pokemon: ResumeInfoPokeapi, slot: number }) => {
           const pokemonId = pokemon?.pokemon?.url.match('([^/]+)/?$')![1];
           return Number(pokemonId) <= environment.pokemons_count? this.http.get<PokemonDetail>(`${pokemon?.pokemon?.url}`) : of(null )
          }
         ))
      }),
      tap((pokemons: PokemonDetail[]) => this.insertPokemons(pokemons, { clear: clearSubject}))
    );
  }

  private insertPokemons(pokemons: PokemonDetail[], options?: { clear?:boolean, search?: boolean}): void {
    if(options?.clear)
    this.clearPokemons();

    const pokemonsForSubject = options?.search? pokemons : this.pokemonsSubject.getValue().concat(pokemons);
    this.pokemonsSubject.next(pokemonsForSubject);

  }

  returnPokemons(): Observable<PokemonDetail[]> {
    return this.pokemonsSubject.asObservable();
  }

  clearPokemons(): void {
    this.pokemonsSubject.next([]);
  }

  hasPokemons(): boolean {
    return this.pokemonsSubject?.value?.length > 0;
  }
}
