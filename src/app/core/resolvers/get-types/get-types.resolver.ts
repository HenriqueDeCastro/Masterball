import { TypeService } from './../../services/type/type.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralPokeapi } from 'src/app/shared/models/interfaces/pokeapi';

@Injectable({
  providedIn: 'root'
})
export class GetTypesResolver implements Resolve<GeneralPokeapi | null> {

  constructor(private typeService: TypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GeneralPokeapi> | null {
    if(this.typeService.hasTypes()) {
      return null;
    }

    return this.typeService.getAllTypes();
  }
}
