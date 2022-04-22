import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, mergeMap, Observable, tap } from 'rxjs';
import { GeneralPokeapi, ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/pokeapi';
import { RegionDetail } from 'src/app/shared/models/interfaces/region';
import { environment } from 'src/environments/environment';

const URL_POKEAPI = environment.url_pokeapi;

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private url_api = `${URL_POKEAPI}/region`;
  private regionSubject = new BehaviorSubject<RegionDetail[]>([]);

  constructor(private http: HttpClient) { }

  getAllRegions(): Observable<RegionDetail[]> {
    return this.http.get<any>(this.url_api).pipe(
      mergeMap((generalInfo: GeneralPokeapi): Observable<RegionDetail[]> => {
        return forkJoin(generalInfo?.results?.map((region: ResumeInfoPokeapi) => this.http.get<RegionDetail>(`${region.url}`)))
      }),
      tap((response: RegionDetail[]) => this.insertRegions(response))
    );
  }

  private insertRegions(types: RegionDetail[]): void {
    this.regionSubject.next(types);
  }

  hasRegions(): boolean {
    return this.regionSubject?.value?.length > 0;
  }

  returnRegions(): Observable<RegionDetail[]> {
    return this.regionSubject.asObservable();
  }
}
