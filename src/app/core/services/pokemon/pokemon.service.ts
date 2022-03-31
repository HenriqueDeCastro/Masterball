import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, mergeMap, Observable, tap, empty, EMPTY, of } from 'rxjs';

import { PokemonDetail, PokemonGeneral } from 'src/app/shared/models/interfaces/pokemon';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_api = `${URL_POKEAPI}/pokemon`;
  private pokemonsSubject = new BehaviorSubject<PokemonDetail[]>([]);

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonDetail[]> {
    let params = new HttpParams();
    params = params.set('limit', environment.pokemons_pagination);
    params = params.set('offset', this.pokemonsSubject?.value?.length);

    return this.http.get<any>(this.url_api, { params }).pipe(
      mergeMap((generalInfo: PokemonGeneral): Observable<any[]> => {
        return forkJoin(generalInfo.results.map((pokemon: ResumeInfoPokeapi, index: number) =>
          (this.pokemonsSubject.value.length + index) < environment.pokemons_count? this.http.get<PokemonDetail>(`${pokemon.url}`) : of(null)
        ))
      }),
      tap((pokemons: PokemonDetail[]) => this.insertPokemons((pokemons)))
    );
  }

  getPokemonBySearch(search: string): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.url_api}/${search}`).pipe(
      tap((pokemon: PokemonDetail) => this.insertPokemons([pokemon], true))
    );
  }

  private insertPokemons(pokemons: PokemonDetail[], search?: boolean): void {
    const pokemonsForSubject = search? pokemons : this.pokemonsSubject.getValue().concat(pokemons);
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
