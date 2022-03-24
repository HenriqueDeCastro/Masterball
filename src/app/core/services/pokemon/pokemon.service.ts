import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, mergeMap, Observable, map, tap, publishReplay } from 'rxjs';

import { PokemonDetail, PokemonGeneral } from 'src/app/shared/models/interfaces/pokemon';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url_api = `${URL_POKEAPI}/pokemon`;
  pokemonsSubject = new BehaviorSubject<PokemonDetail[]>([]);

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonDetail[]> {
    let params = new HttpParams();
    params = params.set('limit', 24);
    params = params.set('offset', this.pokemonsSubject?.value?.length);

    return this.http.get<any>(this.url_api, { params }).pipe(
      mergeMap((generalInfo: PokemonGeneral): Observable<PokemonDetail[]> => {
        return forkJoin(generalInfo.results.map((pokemon: ResumeInfoPokeapi) => this.http.get<PokemonDetail>(`${this.url_api}/${pokemon.name}`)))
      }),
      tap((pokemons: PokemonDetail[]) => this.insertPokemons((pokemons)))
    );
  }

  private insertPokemons(pokemons: PokemonDetail[]): void {
    this.pokemonsSubject.next(this.pokemonsSubject.getValue().concat(pokemons));
  }

  returnPokemons(): Observable<PokemonDetail[]> {
    return this.pokemonsSubject.asObservable();
  }

  hasPokemons(): boolean {
    return this.pokemonsSubject?.value?.length > 0;
  }
}
