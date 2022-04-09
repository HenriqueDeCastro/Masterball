import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() clicked: EventEmitter<EventSelectFilter>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {}

  selectFilter(type: string): void {
    const checked = this.typeSelected !== type;
    this.typeSelected = checked? type : null;

    this.clicked.emit({
      checked: checked,
      type: '',
      value: type
    });
  }
}
