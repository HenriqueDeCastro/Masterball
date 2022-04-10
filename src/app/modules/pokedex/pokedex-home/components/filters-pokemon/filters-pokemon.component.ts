import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventSelectFilterEnum } from 'src/app/shared/models/enum';
import { EventSelectFilter } from 'src/app/shared/models/interfaces/event';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';

@Component({
  selector: 'app-filters-pokemon',
  templateUrl: './filters-pokemon.component.html',
  styleUrls: ['./filters-pokemon.component.scss']
})
export class FiltersPokemonComponent implements OnInit {

  @Input() types!: ResumeInfoPokeapi[];
  @Input() typeSelected!: string | null;
  @Output() selected: EventEmitter<EventSelectFilter>;
  eventSelectFilterEnum: typeof EventSelectFilterEnum;

  constructor() {
    this.selected = new EventEmitter();
    this.eventSelectFilterEnum = EventSelectFilterEnum;
  }

  ngOnInit(): void {}

  selectFilter(typeFilter:string, typePokemon: string): void {
    const checked = this.typeSelected !== typePokemon;
    this.typeSelected = checked? typePokemon : null;

    this.selected.emit({
      checked: checked,
      type: typeFilter,
      value: typePokemon
    });
  }
}
