import { RegionService } from './../../services/region/region.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegionDetail } from 'src/app/shared/models/interfaces/region';

@Injectable({
  providedIn: 'root'
})
export class GetRegionsResolver implements Resolve<RegionDetail[] | null> {

  constructor(private regionService: RegionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RegionDetail[]> | null {
    if(this.regionService.hasRegions()) {
      return null;
    }

    return this.regionService.get();
  }
}
