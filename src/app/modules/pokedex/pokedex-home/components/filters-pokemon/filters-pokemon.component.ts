import { Component, Input, Output, EventEmitter } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/factorys/loading/loading.service';
import { RegionService } from 'src/app/core/services/region/region.service';
import { TypeService } from 'src/app/core/services/type/type.service';
import { EventSelectFilterEnum } from 'src/app/shared/models/enum';
import { EventSelectFilter } from 'src/app/shared/models/interfaces/event';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/pokeapi';
import { RegionDetail } from 'src/app/shared/models/interfaces/region';

@Component({
  selector: 'app-filters-pokemon',
  templateUrl: './filters-pokemon.component.html',
  styleUrls: ['./filters-pokemon.component.scss']
})
export class FiltersPokemonComponent {

  @Input() typeSelected!: string | null;
  @Input() regionSelected!: string | null;
  @Output() selected: EventEmitter<EventSelectFilter>;
  types$!: Observable<ResumeInfoPokeapi[]>;
  regions$!: Observable<RegionDetail[]>;
  loading$: Observable<boolean>;
  eventSelectFilterEnum: typeof EventSelectFilterEnum;

  constructor(
    private typeService: TypeService,
    private regionService: RegionService,
    private loadingService: LoadingService) {
    this.selected = new EventEmitter();
    this.eventSelectFilterEnum = EventSelectFilterEnum;
    this.loading$ = this.loadingService.getLoading().pipe(delay(0));
    this.types$ = this.typeService.returnTypes();
    this.regions$ = this.regionService.returnRegions();
  }

  selectFilter(type:string, value: string): void {
    let checked!: boolean;

    if(type == EventSelectFilterEnum.TypePokemon) {
      checked = this.typeSelected !== value;
      this.typeSelected = checked? value : null;

    } else if(type == EventSelectFilterEnum.Region) {
      checked = this.regionSelected !== value;
      this.regionSelected = checked? value : null;
    }

    this.selected.emit({ checked: checked, type: type, value: value });
  }
}
