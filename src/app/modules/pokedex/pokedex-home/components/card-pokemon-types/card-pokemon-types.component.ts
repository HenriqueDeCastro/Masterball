import { Types } from './../../../../../shared/models/interfaces/pokemon';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-pokemon-types',
  templateUrl: './card-pokemon-types.component.html',
  styleUrls: ['./card-pokemon-types.component.scss']
})
export class CardPokemonTypesComponent {

  @Input() pokemonsTypes!: Types[];

}
