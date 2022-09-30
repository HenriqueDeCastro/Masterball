import { ResumeInfoPokeapi } from '../../../shared/models/interfaces/pokeapi/resume-info-pokeapi';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralPokeapi } from 'src/app/shared/models/interfaces/pokeapi';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private url_api = `${URL_POKEAPI}/type`;
  private typesSubject = new BehaviorSubject<ResumeInfoPokeapi[]>([]);

  constructor(private http: HttpClient) { }

  get(): Observable<GeneralPokeapi> {
    return this.http.get<GeneralPokeapi>(this.url_api).pipe(
      tap((response: GeneralPokeapi) => this.insertTypes(response.results))
    );
  }

  private insertTypes(types: ResumeInfoPokeapi[]): void {
    this.typesSubject.next(types);
  }

  hasTypes(): boolean {
    return this.typesSubject?.value?.length > 0;
  }

  returnTypes(): Observable<ResumeInfoPokeapi[]> {
    return this.typesSubject.asObservable();
  }
}
