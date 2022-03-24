import { ResumeInfoPokeapi } from './../../../shared/models/interfaces/resume-info-pokeapi/resume-info-pokeapi';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { PokemonGeneral } from 'src/app/shared/models/interfaces/pokemon';
import { environment } from 'src/environments/environment';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  url_api = `${URL_POKEAPI}/type`;
  typesSubject = new BehaviorSubject<ResumeInfoPokeapi[]>([]);

  constructor(private http: HttpClient) { }

  getTypes(): Observable<PokemonGeneral> {
    return this.http.get<PokemonGeneral>(this.url_api).pipe(
      tap((response: PokemonGeneral) => this.insertTypes(response.results))
    );
  }

  private insertTypes(types: ResumeInfoPokeapi[]): void {
    this.typesSubject.next(types);
  }

  returnTypes(): Observable<ResumeInfoPokeapi[]> {
    return this.typesSubject.asObservable();
  }
}
